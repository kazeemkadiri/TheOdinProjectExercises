window.onload = () => {
 initializeDomListeners();
}

let myLibrary = [];
const bookForm = document.querySelector("form");

function initializeDomListeners(){
  document.querySelector("#new-book")
    .addEventListener("click", function(){
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

function resetFormFields(){
  bookForm.reset();
}

function displayForm(){
  bookForm.classList.toggle("show");
}

function preventFormSubmit(e){
  e.preventDefault();
}

