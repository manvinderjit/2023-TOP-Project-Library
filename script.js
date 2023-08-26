// Array to store all book objects
const myLibrary = [];

const bookListContainer = document.getElementById("book-list");

function Book(title, author, pages, read) {    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // this.bookInfo = function() {
    //     return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? 'has been read' : 'not read yet'}.`;
    // }
}



const hobbitBook = new Book ('The Hobbit', 'J.R.R. Tolkein', 295, false);
addBookToLibrary(hobbitBook);
const hpBook = new Book ('Harry Potter', 'J.K. Rowling', 500, false);
addBookToLibrary(hpBook);


// console.log(hobbitBook.bookInfo());

function addBookToLibrary(book) {    
    myLibrary.push(book);
}

function createBookRow(book, bookIndex) {

    let bookRow = document.createElement('div');
    bookRow.classList.add("book-row");    

    let fieldSerialNo = document.createElement('div');
    fieldSerialNo.textContent = bookIndex + 1;
    bookRow.appendChild(fieldSerialNo);

    for(const property in book) {        
        let fieldDiv = document.createElement('div');
        fieldDiv.textContent = book[property];
        bookRow.appendChild(fieldDiv);
    }
    return bookRow;
}

function displayAllBooksInLibrary() {
    myLibrary.forEach((book) => {
        let bookIndex = (myLibrary.indexOf(book));
        bookListContainer.appendChild(createBookRow(book, bookIndex));
    });
}

displayAllBooksInLibrary();