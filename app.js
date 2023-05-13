'use strict';
// Recommended books
var recommendedBooks = [
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
var form = document.querySelector('#form');
var openFormBtn = document.querySelector('#openForm');
var tBody = document.querySelector('tbody');
var recommendBtn = document.querySelector('#recommendBtn');
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
        // Mark book as read
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
        (_a = document.getElementById('title')) === null || _a === void 0 ? void 0 : _a.focus();
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
        var booksToAdd = recommendedBooks.slice(0, 3);
        // Add each book to the table
        booksToAdd.forEach(function (book, index) {
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
            newRead.appendChild(newCheckbox);
            newTr.appendChild(newRead);
            newTr.style.opacity = '0';
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
            // Mark book as read
            newCheckbox.addEventListener('click', function (e) {
                _this.markRead(e.target, newBook.id);
            });
            // Fade in the book
            setTimeout(function () {
                newTr.style.opacity = String(1);
            }, 200 * (index + 1));
        });
        // Remove added books from recommendedBooks array
        recommendedBooks.splice(0, 3);
        // Hide button if all books have been added
        if (recommendedBooks.length === 0) {
            recommendBtn.style.display = 'none';
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
recommendBtn.addEventListener('click', function () {
    library.recommendBooks();
    library.closeForm();
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
