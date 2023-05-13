'use strict';
// Recommended books
var recommendedBooks = [
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
var form = document.querySelector('#form');
var openFormBtn = document.querySelector('#openForm');
var tBody = document.querySelector('tbody');
var Book = /** @class */ (function () {
    function Book(id, title, author, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.read = read;
    }
    return Book;
}());
var books = [];
var Library = /** @class */ (function () {
    function Library(books) {
        this.bookCount = books.length;
        this.books = books;
    }
    Library.prototype.markRead = function (checkbox, id) {
        this.books.forEach(function (book) {
            if (id === book.id) {
                book.read = true;
                checkbox.checked = true;
                checkbox.disabled = true;
            }
        });
    };
    Library.prototype.addBook = function () {
        var _this = this;
        // Get form values
        var title = document.querySelector('#title').value;
        var author = document.querySelector('#author').value;
        var read = document.querySelector('#read').checked;
        // Create new book
        var newBook = new Book(this.bookCount, title, author, read);
        // Create new row
        var newTr = document.createElement('tr');
        tBody.appendChild(newTr);
        // Create new cells, add content, and append to row
        var newTitle = document.createElement('td');
        newTitle.textContent = title;
        newTr.appendChild(newTitle);
        var newAuthor = document.createElement('td');
        newAuthor.textContent = author;
        newTr.appendChild(newAuthor);
        var newRead = document.createElement('td');
        var newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.className = 'readLibraryCheckbox';
        newCheckbox.checked = read;
        newCheckbox.disabled = read;
        newRead.appendChild(newCheckbox);
        newTr.appendChild(newRead);
        var newReadLabel = document.createElement('label');
        newReadLabel.htmlFor = 'readLibraryCheckbox';
        newRead.appendChild(newReadLabel);
        var newReadDiv = document.createElement('div');
        newReadLabel.appendChild(newReadDiv);
        var newDelete = document.createElement('td');
        newDelete.classList.add('deleteBtn');
        newDelete.id = 'deleteBtn-' + newBook.id;
        newTr.appendChild(newDelete);
        // Add new book to books array
        this.books.push(newBook);
        // Increment bookCount (index)
        this.bookCount++;
        // Mark book as read and disable it
        newCheckbox.addEventListener('click', function (e) {
            _this.markRead(e.target, newBook.id);
        });
    };
    // Remove book from library
    Library.prototype.removeBook = function (id) {
        var parsedId = parseInt(id.toString());
        for (var i = 0; i < this.books.length; i++) {
            if (parsedId === this.books[i].id) {
                this.books.splice(i, 1);
                this.bookCount--;
            }
        }
    };
    // Open form
    Library.prototype.openForm = function () {
        var _a;
        form.style.display = 'block';
        openFormBtn.style.display = 'none';
        (_a = document.getElementById('title')) === null || _a === void 0 ? void 0 : _a.focus;
    };
    // Close form
    Library.prototype.closeForm = function () {
        form.style.display = 'none';
        openFormBtn.style.display = 'block';
        form.reset();
    };
    // Recommend books
    Library.prototype.recommendBooks = function () {
        var _this = this;
        var booksToAdd = recommendedBooks.slice(0, 5);
        // Add each book to the table
        booksToAdd.forEach(function (book) {
            // Create new row
            var newTr = document.createElement('tr');
            tBody.appendChild(newTr);
            // Create new cells, add content, and append to row
            var newTitle = document.createElement('td');
            newTitle.textContent = book.title;
            newTr.appendChild(newTitle);
            var newAuthor = document.createElement('td');
            newAuthor.textContent = book.author;
            newTr.appendChild(newAuthor);
            var newRead = document.createElement('td');
            var newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.className = 'readLibraryCheckbox';
            newCheckbox.disabled = false;
            newRead.appendChild(newCheckbox);
            newTr.appendChild(newRead);
            var newReadLabel = document.createElement('label');
            newReadLabel.htmlFor = 'readLibraryCheckbox';
            newRead.appendChild(newReadLabel);
            var newReadDiv = document.createElement('div');
            newReadLabel.appendChild(newReadDiv);
            // Add new book to books array
            var newBook = new Book(_this.bookCount, book.title, book.author, book.read);
            _this.books.push(newBook);
            var newDelete = document.createElement('td');
            newDelete.classList.add('deleteBtn');
            newDelete.id = 'deleteBtn-' + newBook.id;
            newTr.appendChild(newDelete);
            // Increment bookCount (index)
            _this.bookCount++;
        });
        // Remove added books from recommendedBooks array
        recommendedBooks.splice(0, 5);
        // Hide button if all books have been added
        if (recommendedBooks.length === 0) {
            var recommendBtn_1 = document.querySelector('#recommendBtn');
            recommendBtn_1.style.display = 'none';
        }
    };
    return Library;
}());
var library = new Library(books);
// Add event listener to openForm button
openFormBtn.addEventListener('click', function () {
    library.openForm();
});
// Add event listener to recommendBtn
var recommendBtn = document.querySelector('#recommendBtn');
recommendBtn.addEventListener('click', function () {
    library.recommendBooks();
});
// Add event listener to formBtn submit button
form.addEventListener('submit', function (e) {
    e.preventDefault();
    library.addBook();
    library.closeForm();
});
// Add event listener to deleteBtn button
tBody.addEventListener('click', function (e) {
    var _a;
    var target = e.target;
    if (target.id.indexOf('deleteBtn') !== -1) {
        var id = parseInt(target.id.split('-')[1]);
        library.removeBook(id);
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    }
});
