
 let myLibrary = [];
 
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
                                                            
function Book({title, numPages, author, pubDate}) {
  // the constructor...
  this.title = title;
  this.numberOfPages = numPages;
  this.author = author;
  this.publishedDate = pubDate;
  this.read = false;
}

Book.prototype.toggleRead = function(){
  this.read = !this.read;
}

function addBookToLibrary() {
  const bookPropsElements = document.querySelectorAll("input.book-prop");
                  		                                            
  const bookProps = {};
                 
  bookPropsElements.forEach(bookProp => {
    bookProps[bookProp.id.split("-")[1]] = bookProp.value
  });
 
  myLibrary.push(new Book(bookProps));

  render();

  resetFormFields();
 
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
  				     
  const htmlBookList = myLibrary.map((book, bookIndex) => {
    return `<li>
      <div class="card">
      <h3 class="card-title">${book.title}</h3>
      <p>
        <span class="color-grey">by </span>
        ${book.author}
        
        <span class="color-grey">Date Of Publication: </span>
        ${book.publishedDate}
      </p>
       <button class="btn bg-red book-btn del-book-btn" data-book-id="${bookIndex}">
         Remove
       </button>
       <button class="btn book-btn read-book" data-book-id="${bookIndex}">
         Mark as ${book.read ? "unread" : "read"}
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
  myLibrary[this.dataset.bookId].toggleRead();
  render();
}
	
function handleDeleteBook(){
  myLibrary.splice(this.dataset.bookId, 1);
  render();
}

function preventFormSubmit(e){
  e.preventDefault();
}

    
