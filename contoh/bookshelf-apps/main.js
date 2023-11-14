document.addEventListener("DOMContentLoaded", function () {
  const inputBookTitle = document.getElementById("inputBookTitle");
  const inputBookAuthor = document.getElementById("inputBookAuthor");
  const inputBookYear = document.getElementById("inputBookYear");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  const bookSubmit = document.getElementById("bookSubmit");
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
  const searchBookForm = document.getElementById("searchBook");

  let books = JSON.parse(localStorage.getItem("books")) || [];

  bookSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    addBook();
  });
  searchBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchBook();
  });

  function saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  function addBook() {
    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;
    const year = parseInt(inputBookYear.value);
    const isComplete = inputBookIsComplete.checked;

    if (title === "" || author === "" || isNaN(year)) {
      alert("Mohon lengkapi semua data buku!");
      return;
    }

    const newBook = {
      id: +new Date(),
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };

    books.push(newBook);
    saveBooksToLocalStorage();

    if (isComplete) {
      addToCompleteBookshelf(newBook);
    } else {
      addToIncompleteBookshelf(newBook);
    }

    clearInputForm();
  }

  function addToIncompleteBookshelf(book) {
    const bookItem = createBookItem(book);
    incompleteBookshelfList.appendChild(bookItem);
  }

  function addToCompleteBookshelf(book) {
    const bookItem = createBookItem(book);
    completeBookshelfList.appendChild(bookItem);
  }

  function createBookItem(book) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");
    bookItem.dataset.id = book.id;

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = "Penulis: " + book.author;

    const bookYear = document.createElement("p");
    bookYear.innerText = "Tahun: " + book.year;

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("action");

    const toggleButton = document.createElement("button");
    toggleButton.classList.add(book.isComplete ? "green" : "red");
    toggleButton.innerText = book.isComplete
      ? "Belum selesai di Baca"
      : "Selesai dibaca";
    toggleButton.addEventListener("click", function () {
      toggleBookStatus(book);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.innerText = "Hapus buku";
    deleteButton.addEventListener("click", function () {
      deleteBook(book);
    });

    actionDiv.appendChild(toggleButton);
    actionDiv.appendChild(deleteButton);

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookYear);
    bookItem.appendChild(actionDiv);

    return bookItem;
  }

  function clearInputForm() {
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;
  }

  function toggleBookStatus(book) {
    book.isComplete = !book.isComplete;
    const bookItem = document.querySelector(`[data-id="${book.id}"]`);
    const toggleButton = bookItem.querySelector("button");
    toggleButton.classList.remove(book.isComplete ? "red" : "green");
    toggleButton.classList.add(book.isComplete ? "green" : "red");
    toggleButton.innerText = book.isComplete
      ? "Belum selesai di Baca"
      : "Selesai dibaca";

    if (book.isComplete) {
      completeBookshelfList.appendChild(bookItem);
    } else {
      incompleteBookshelfList.appendChild(bookItem);
    }

    saveBooksToLocalStorage();
  }

  function deleteBook(book) {
    const bookItem = document.querySelector(`[data-id="${book.id}"]`);
    bookItem.remove();

    books = books.filter((b) => b.id !== book.id);
    saveBooksToLocalStorage();
  }

  function loadBooksFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    for (const book of storedBooks) {
      if (book.isComplete) {
        addToCompleteBookshelf(book);
      } else {
        addToIncompleteBookshelf(book);
      }
    }
    books = storedBooks;
  }

  function searchBook() {
    const searchTitle = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();
    const searchResults = books.filter((book) =>
      book.title.toLowerCase().includes(searchTitle)
    );

    clearBookshelves();

    for (const result of searchResults) {
      if (result.isComplete) {
        addToCompleteBookshelf(result);
      } else {
        addToIncompleteBookshelf(result);
      }
    }
  }

  function clearBookshelves() {
    while (incompleteBookshelfList.firstChild) {
      incompleteBookshelfList.removeChild(incompleteBookshelfList.firstChild);
    }

    while (completeBookshelfList.firstChild) {
      completeBookshelfList.removeChild(completeBookshelfList.firstChild);
    }
  }

  loadBooksFromLocalStorage();
});
