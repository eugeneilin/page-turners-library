'use strict';

// Recommended books
const recommendedBooks = [
  { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', read: false },
  { title: 'Think and Grow Rich', author: 'Napoleon Hill', read: false },
  { title: 'The Power of Positive Thinking', author: 'Norman Vincent Peale', read: false },
  { title: 'Awaken the Giant Within', author: 'Tony Robbins', read: false },
  { title: 'The Alchemist', author: 'Paulo Coelho', read: false },
  { title: "Man's Search for Meaning", author: 'Viktor E. Frankl', read: false },
  { title: 'The Magic of Thinking Big', author: 'David J. Schwartz', read: false },
  { title: 'The 5 AM Club', author: 'Robin Sharma', read: false },
  { title: 'Atomic Habits', author: 'James Clear', read: false },
  { title: 'The One Thing', author: 'Gary Keller', read: false },
  { title: 'Essentialism: The Disciplined Pursuit of Less', author: 'Greg McKeown', read: false },
  { title: 'Deep Work', author: 'Cal Newport', read: false },
  { title: 'The Lean Startup', author: 'Eric Ries', read: false },
  { title: 'Start with Why', author: 'Simon Sinek', read: false },
  { title: 'Good to Great', author: 'Jim Collins', read: false },
  { title: 'The Compound Effect', author: 'Darren Hardy', read: false },
  { title: 'The 4-Hour Work Week', author: 'Tim Ferriss', read: false },
  { title: 'Crush It!', author: 'Gary Vaynerchuk', read: false },
  { title: 'The $100 Startup', author: 'Chris Guillebeau', read: false },
  {
    title: 'The Art of Possibility',
    author: 'Rosamund Stone Zander and Benjamin Zander',
    read: false,
  },
];

// Get DOM elements
const form = document.querySelector('#form') as HTMLFormElement;
const openFormBtn = document.querySelector('#openForm') as HTMLButtonElement;
const tBody = document.querySelector('tbody') as HTMLTableSectionElement;

class Book {
  id: number;
  title: string;
  author: string;
  read: boolean;

  constructor(id: number, title: string, author: string, read: boolean) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

const books: Book[] = [];

class Library {
  bookCount: number;
  books: Book[];

  constructor(books: Book[]) {
    this.bookCount = books.length;
    this.books = books;
  }

  markRead(checkbox: HTMLInputElement, id: number): void {
    this.books.forEach((book) => {
      if (id === book.id) {
        book.read = true;
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }

  addBook(): void {
    // Get form values
    let title = (document.querySelector<HTMLInputElement>('#title') as HTMLInputElement).value;
    let author = (document.querySelector<HTMLInputElement>('#author') as HTMLInputElement).value;
    let read = (document.querySelector<HTMLInputElement>('#read') as HTMLInputElement).checked;

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
    newCheckbox.className = 'readLibraryCheckbox';
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
      this.markRead(e.target as HTMLInputElement, newBook.id);
    });
  }

  // Remove book from library
  removeBook(id: number): void {
    const parsedId = parseInt(id.toString());

    for (let i = 0; i < this.books.length; i++) {
      if (parsedId === this.books[i].id) {
        this.books.splice(i, 1);
        this.bookCount--;
      }
    }
  }

  // Open form
  openForm(): void {
    form.style.display = 'block';
    openFormBtn.style.display = 'none';
    document.getElementById('title')?.focus;
  }

  // Close form
  closeForm(): void {
    form.style.display = 'none';
    openFormBtn.style.display = 'block';
    form.reset();
  }

  // Recommend books
  recommendBooks(): void {
    const booksToAdd = recommendedBooks.slice(0, 5);

    // Add each book to the table
    booksToAdd.forEach((book) => {
      // Create new row
      const newTr = document.createElement('tr');
      tBody.appendChild(newTr);

      // Create new cells, add content, and append to row
      const newTitle = document.createElement('td');
      newTitle.textContent = book.title;
      newTr.appendChild(newTitle);

      const newAuthor = document.createElement('td');
      newAuthor.textContent = book.author;
      newTr.appendChild(newAuthor);

      const newRead = document.createElement('td');
      const newCheckbox = document.createElement('input');
      newCheckbox.type = 'checkbox';
      newCheckbox.className = 'readLibraryCheckbox';
      newCheckbox.disabled = false;
      newRead.appendChild(newCheckbox);
      newTr.appendChild(newRead);

      let newReadLabel = document.createElement('label');
      newReadLabel.htmlFor = 'readLibraryCheckbox';
      newRead.appendChild(newReadLabel);
      let newReadDiv = document.createElement('div');
      newReadLabel.appendChild(newReadDiv);

      // Add new book to books array
      const newBook = new Book(this.bookCount, book.title, book.author, book.read);
      this.books.push(newBook);

      let newDelete = document.createElement('td');
      newDelete.classList.add('deleteBtn');
      newDelete.id = 'deleteBtn-' + newBook.id;
      newTr.appendChild(newDelete);

      // Increment bookCount (index)
      this.bookCount++;
    });

    // Remove added books from recommendedBooks array
    recommendedBooks.splice(0, 5);

    // Hide button if all books have been added
    if (recommendedBooks.length === 0) {
      const recommendBtn = document.querySelector('#recommendBtn') as HTMLButtonElement;
      recommendBtn.style.display = 'none';
    }
  }
}

const library = new Library(books);

// Add event listener to openForm button
openFormBtn.addEventListener('click', () => {
  library.openForm();
});

// Add event listener to recommendBtn
const recommendBtn = document.querySelector('#recommendBtn') as HTMLButtonElement;
recommendBtn.addEventListener('click', () => {
  library.recommendBooks();
});

// Add event listener to formBtn submit button
form.addEventListener('submit', (e) => {
  e.preventDefault();
  library.addBook();
  library.closeForm();
});

// Add event listener to deleteBtn button
tBody.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLButtonElement;
  if (target.id.indexOf('deleteBtn') !== -1) {
    let id = parseInt(target.id.split('-')[1]);
    library.removeBook(id);
    target.parentElement?.remove();
  }
});
