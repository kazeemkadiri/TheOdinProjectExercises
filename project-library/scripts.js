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

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  const bookProps = document.querySelectorAll("input .book-prop");
  bookProps.forEach(bookProp => {
  	console.log(bookProp.value);
  })
}

function displayForm(){
  bookForm.classList.toggle("show");
}

function preventFormSubmit(e){
  e.preventDefault();
}
    
