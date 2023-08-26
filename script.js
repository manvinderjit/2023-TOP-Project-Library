// Array to store all book objects
const myLibrary = [];
const bookListContainer = document.getElementById("book-list");

let nextBookSerialNo;

function generateBookSerialNo() {
    return (myLibrary.length == 0) ? 1: (myLibrary[myLibrary.length-1].serialNo + 1);
}

function Book(title, author, pages, read) {    
    this.serialNo = generateBookSerialNo();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // this.bookInfo = function() {
    //     return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? 'has been read' : 'not read yet'}.`;
    // }
}

// console.log(hobbitBook.bookInfo());

// function generateBookSerialNo() {
//     if(myLibrary.length == 0 ) {
//         return 1;
//     }    
//     return (myLibrary[myLibrary.length-1].serialNo + 1);
// }

function addBookToLibrary(book) {    
    myLibrary.push(book);
}

function createBookRow(book, bookIndex) {

    let bookRow = document.createElement('div');
    bookRow.classList.add("book-row");    

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

const hobbitBook = new Book ('The Hobbit', 'J.R.R. Tolkein', 295, false);
addBookToLibrary(hobbitBook);
const hpBook = new Book ('Harry Potter', 'J.K. Rowling', 500, false);
addBookToLibrary(hpBook);

displayAllBooksInLibrary();

console.log(myLibrary);