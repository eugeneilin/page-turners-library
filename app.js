'use strict';

// Get DOM elements
const form = document.querySelector('#form');
const openFormBtn = document.querySelector('#openForm');
const tBody = document.querySelector('tbody');

class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

const books = [];

class Library {
  constructor(books) {
    this.bookCount = books.length;
    this.books = books;
  }

  markRead(checkbox, id) {
    this.books.forEach((book) => {
      if (id === book.id) {
        book.read = true;
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }

  addBook() {
    // Get form values
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let read = document.querySelector('#read').checked;

    // Create new book
    let newBook = new Book(this.bookCount, title, author, read);

    // Create new row
    let newTr = document.createElement('tr');
    tBody.appendChild(newTr);

    // Create new cells, add content, and append to row
    let newTitle = document.createElement('td');
    newTitle.textContent = title;
    newTr.appendChild(newTitle);

    let newAuthor = document.createElement('td');
    newAuthor.textContent = author;
    newTr.appendChild(newAuthor);

    let newRead = document.createElement('td');
    let newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.id = 'readLibraryCheckbox';
    newCheckbox.checked = read;
    newCheckbox.disabled = read;
    newRead.appendChild(newCheckbox);
    newTr.appendChild(newRead);

    let newReadLabel = document.createElement('label');
    newReadLabel.htmlFor = 'readLibraryCheckbox';
    newRead.appendChild(newReadLabel);
    let newReadDiv = document.createElement('div');
    newReadLabel.appendChild(newReadDiv);

    let newDelete = document.createElement('td');
    newDelete.classList.add('deleteBtn');
    newDelete.id = 'deleteBtn-' + newBook.id;
    newTr.appendChild(newDelete);

    // Add new book to books array
    this.books.push(newBook);

    // Increment bookCount (index)
    this.bookCount++;

    // Mark book as read and disable it
    newCheckbox.addEventListener('click', (e) => {
      this.markRead(e.target, newBook.id);
    });
  }

  // Create a method that will remove a book from the Library
  removeBook(id) {
    this.books.forEach((book, index) => {
      if (id === book.id) {
        this.books.splice(index, 1);
        this.bookCount--;
      }
    });
  }

  openForm() {
    form.style.display = 'block';
    openFormBtn.style.display = 'none';
    document.getElementById('title').focus();
  }

  closeForm() {
    form.style.display = 'none';
    openFormBtn.style.display = 'block';
    form.reset();
  }
}

const library = new Library(books);

// Add event listener to openForm button
openFormBtn.addEventListener('click', () => {
  library.openForm();
});

// Add event listener to formBtn submit button
form.addEventListener('submit', (e) => {
  e.preventDefault();
  library.addBook();
  library.closeForm();
});

// Add event listener to deleteBtn button
tBody.addEventListener('click', (e) => {
  if (e.target.id.includes('deleteBtn')) {
    let id = e.target.id.split('-')[1];
    library.removeBook(id);
    e.target.parentElement.remove();
  }
});
