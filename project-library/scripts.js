window.onload = () => {
 initializeDomListeners();
}

let myLibrary = [];
const bookForm = document.querySelector("form");
const newBookButton = document.querySelector("#new-book")
      
function initializeDomListeners(){
    newBookButton.addEventListener("click", function(){
      displayForm();
      this.setAttribute("disabled", "disabled");
    });
}
                                                            
function Book({title, numPages, author, pubDate}) {
  // the constructor...
  this.title = title;
  this.numberOfPages = numPages;
  this.author = author;
  this.publishedDate = pubDate;
}

function addBookToLibrary() {
  const bookPropsElements = document.querySelectorAll("input.book-prop");
                                                              
  const bookProps = {};
                 
  bookPropsElements.forEach(bookProp => {
    bookProps[bookProp.id.split("-")[1]] = bookProp.value
  });
 
  myLibrary.push(new Book(bookProps));

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
  
}

function preventFormSubmit(e){
  e.preventDefault();
}

