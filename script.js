// Array to store all book objects
const myLibrary = [];

function Book(title, author, pages, read) {
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.bookInfo = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? 'has been read' : 'not read yet'}.`;
    }
}

const hobbitBook = new Book ('The Hobbit', 'J.R.R. Tolkein', 295, false);
const hpBook = new Book ('Harry Potter', 'J.K. Rowling', 500, false);


console.log(hobbitBook.bookInfo());

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayAllBooksInLibrary() {
    myLibrary.forEach((book) => console.log(book));
}

addBookToLibrary(hobbitBook);
addBookToLibrary(hpBook);

displayAllBooksInLibrary();
// console.log(myLibrary);
