'use strict';

// Recommended books
const recommendedBooks = [
  { title: 'Redefining Anxiety', author: 'John Delony', read: false },
  { title: 'Think and Grow Rich', author: 'Napoleon Hill', read: false },
  { title: 'Better Than Good', author: 'Zig Ziglar', read: false },
  { title: 'Awaken the Giant Within', author: 'Tony Robbins', read: false },
  { title: 'The Alchemist', author: 'Paulo Coelho', read: false },
  { title: 'The Millionaire Next Door', author: 'Thomas J. Stanley', read: false },
  { title: 'No Excuses!', author: 'Brian Tracy', read: false },
  { title: 'The Total Money Makeover', author: 'Dave Ramsey', read: false },
  { title: 'Atomic Habits', author: 'James Clear', read: false },
  { title: 'Do More Better', author: 'Tim Challies', read: false },
  { title: 'How To Win Friends And Influence People', author: 'Dale Carnegie', read: false },
  { title: 'Deep Work', author: 'Cal Newport', read: false },
  { title: 'A Praying Life', author: 'Paul E. Miller', read: false },
  { title: 'Start with Why', author: 'Simon Sinek', read: false },
  { title: 'Fight Your Fear And Win', author: 'Don Greene, PhD', read: false },
  { title: 'The Compound Effect', author: 'Darren Hardy', read: false },
  { title: 'The 4-Hour Work Week', author: 'Tim Ferriss', read: false },
  { title: '12 Rules for Life', author: 'Jordan Peterson', read: false },
  { title: "Don't Waste Your Life", author: 'John Piper', read: false },
  { title: 'Made for Friendship', author: 'Drew Hunter', read: false },
];

// Get DOM elements
const form = document.querySelector('#form') as HTMLFormElement;
const openFormBtn = document.querySelector('#openForm') as HTMLButtonElement;
const tBody = document.querySelector('tbody') as HTMLTableSectionElement;
const recommendBtn = document.querySelector('#recommendBtn') as HTMLButtonElement;

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

const booksToAdd = recommendedBooks.slice(0, 3);

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
    recommendBtn.style.display = 'none';
  }

  // Close form
  closeForm(): void {
    form.style.display = 'none';
    openFormBtn.style.display = 'block';
    form.reset();
    recommendBtn.style.display = 'block';
    // Hide button if all books have been added
    if (recommendedBooks.length === 0) {
      recommendBtn.style.display = 'none';
    }
  }

  // Recommend books
  recommendBooks(): void {
    // Add each book to the table
    booksToAdd.forEach((book, index) => {
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
      newTr.style.opacity = '0';

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

      // Fade in the book
      setTimeout(() => {
        newTr.style.opacity = String(1);
      }, 200 * (index + 1));
    });

    // Remove added books from recommendedBooks array
    recommendedBooks.splice(0, 3);

    // Hide button if all books have been added
    if (recommendedBooks.length === 0) {
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
