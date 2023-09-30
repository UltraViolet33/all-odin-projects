const books_div = document.querySelector("#books");
const addBook_btn = document.querySelector("#add-book-btn");
const addBook_form = document.querySelector("#add-book-form");
const error_div = document.querySelector("#error");

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleStatus = function () {
  this.status = !this.status;
};

const myLibrary = [
  new Book("test", "test", 150, false),
  // {title:"test", author:"test", pages:150, status:false},
  // {title:"test", author:"test", pages:150, status:false},
  // {title:"test", author:"test", pages:150, status:false},
  // {title:"test", author:"test", pages:150, status:false},
  // {title:"test", author:"test", pages:150, status:false},
  // {title:"test", author:"test", pages:150, status:false},
];

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const htmlBooks = myLibrary.map((book, index) => {
    return `<div class="book-item">
    <h3>${book.title}</h3>
    <p>Author : ${book.author}</p>
    <p>${book.pages} pages</p>
    <button class='rm-book-btn' data-book-index='${index}'>Remove</button>
    <button class='toggle-status' data-book-index='${index}'>${
      book.status ? "read" : "not read"
    }</button>
    
    </div>`;
  });

  books_div.innerHTML = htmlBooks.join("");

  const removeBook_btns = document.querySelectorAll(".rm-book-btn");

  for (const btn of removeBook_btns) {
    btn.addEventListener("click", function () {
      const indexBook = btn.getAttribute("data-book-index");
      removeBook(indexBook);
    });
  }

  const toggleStatusBook_btns = document.querySelectorAll(".toggle-status");

  for (const btn of toggleStatusBook_btns) {
    btn.addEventListener("click", function () {
      const indexBook = btn.getAttribute("data-book-index");
      const book = myLibrary[indexBook];
      console.log(book);
      book.toggleStatus();
      displayBooks();
    });
  }
}

addBook_form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;

  let error = "";

  if (title === "") {
    error += "Title missing";
  }

  const author = document.querySelector("#author").value;

  if (author === "") {
    error += "Author missing";
  }

  const pages = document.querySelector("#pages").value;

  if (pages === "") {
    error += "Pages number missing";
  }

  const status = document.querySelector("#status").checked;

  if (error === "") {
    const book = new Book(title, author, pages, status);
    addBookToLibrary(book);
    return;
  }

  error_div.innerHTML = error;
});

function removeBook(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  displayBooks();
}

displayBooks();

addBook_btn.addEventListener("click", function () {
  addBook_form.style.display = "block";
});
