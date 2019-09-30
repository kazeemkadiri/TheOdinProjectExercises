
 let myLibrary = [];
 
 const DOMlog = document.querySelector(".dom-log");
 const bookForm = document.querySelector("form");
 const newBookButton = document.querySelector("#new-book")
 const doneButton = document.querySelector("#done-btn");
 const addBookButton = document.querySelector("#add-book");
 const bookListElement = document.querySelector("#book-list ul");   
 initializeDomListeners();
 render();

function initializeDomListeners(){
	
  newBookButton.addEventListener("click", function(){
    displayForm();
    this.setAttribute("disabled", "disabled");
  });

  doneButton.addEventListener("click", hideBookForm);

  addBookButton.addEventListener("click", addBookToLibrary);
}
                           		                                          
function Book({title, numpages, author, pubdate}) {
  // the constructor...
  this.title = title;
  this.numpages = numpages;
  this.author = author;
  this.pubdate = pubdate;
  this.read = false;
}
			   
Book.prototype.toggleRead = function(){
  this.read = !Boolean(this.read);   
  return;  
};
		 			
function addBookToLibrary() {
  const bookPropsElements = document.querySelectorAll("input.book-prop");
                  		                                            
  const bookProps = {};
                 
  bookPropsElements.forEach(bookProp => {
    bookProps[bookProp.id.split("-")[1]] = bookProp.value
  });

  let newBook = new Book(bookProps);
    	   
  //console.log(JSON.stringify(newBook));

  myLibrary.push(newBook);
  
  persistLibToLocalStor();

  render();

  resetFormFields();
 
}

function persistLibToLocalStor(){
  //DOMlog.append = "persist" + JSON.stringify(myLibrary);
  
  localStorage.removeItem("myLibrary");
  
  localStorage.setItem(
    "myLibrary", JSON.stringify(myLibrary));
    
  return;
}

function hideBookForm(){
  bookForm.classList.remove("show");
  newBookButton.removeAttribute("disabled");
}

function resetFormFields(){
  bookForm.reset();
}

function displayForm(){
  bookForm.classList.toggle("show");
}

function render(){
	 
  if(myLibrary.length === 0){
    
    const tempLib = localStorage.getItem("myLibrary");

    myLibrary = (tempLib !== null) ? JSON.parse(tempLib) : myLibrary;
    	
    myLibrary = myLibrary.map(book => new Book(book));
						
  } 
																	          	     
  const htmlBookList = myLibrary.map((book, bookIndex) => {
   
    return `<li>
      <div class="card">
      <h3 class="card-title">${book.title}</h3>
      <p>
        <span class="color-grey">by </span>
        ${book.author}
        
        <span class="color-grey">Date Of Publication: </span>
        ${book.pubdate}
      </p>
       <button class="btn bg-red book-btn del-book-btn" data-book-id="${bookIndex}">
         Remove
       </button>
       <button class="btn book-btn read-book" data-book-id="${bookIndex}">
         Mark as ${book.read === true ? "unread" : "read"}
       </button> 
      </div>
      </li>`;
  });
		   		    	 	  	 		 		 	          							
  bookListElement.innerHTML = htmlBookList;
  
  addListenersForBooksBtns();
}

function addListenersForBooksBtns(){

  document.querySelectorAll(".book-btn")
    .forEach(btn => {
      if(btn.classList.contains("del-book-btn")){
        btn.addEventListener("click", handleDeleteBook);
        return;
      }
    
      btn.addEventListener("click", handleReadBook);
 						                     
    });

}
              
function handleReadBook(){
  Promise.resolve(myLibrary[this.dataset.bookId].toggleRead())
  .then(toggledRead => persistLibToLocalStor())
  .then(persisted => render())
  //.then(res => DOMlog.innerHTML = " ff"+localStorage.getItem("myLibrary"))
}
												
function handleDeleteBook(){
  myLibrary.splice(this.dataset.bookId, 1);
  persistLibToLocalStor();
  render();
}

function preventFormSubmit(e){
  e.preventDefault();
}
