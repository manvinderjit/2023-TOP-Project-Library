class DisplayController {

    headerRowFields = ["S. No.", "Title", "Author", "Pages", "Read", "Remove", "Toggle"];
    bookListContainer = document.getElementById('book-list');
    addBookForm = document.getElementById('add-new-book');

    constructor() {
        this.displayAllBooksInLibrary();
    }

    createHeaderRow() {
    
        let headerRow = document.createElement('div');
        headerRow.classList.add("book-row",  "heading-row");
        this.headerRowFields.forEach((field) => {
            let headerRowField = document.createElement('div');
            headerRowField.textContent = field;
            headerRow.appendChild(headerRowField);
        });
        return headerRow;
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {        
            parent.removeChild(parent.firstChild);
        }
    }

    displayAllBooksInLibrary() {
    
        this.removeAllChildNodes(this.bookListContainer);
        
        this.bookListContainer.appendChild(this.createHeaderRow());
    
        // myLibrary.forEach((book) => {
        //     let bookIndex = (myLibrary.indexOf(book));
        //     bookListContainer.appendChild(createBookRow(book, bookIndex));
        // });
    
        // removeBookButtonBehavior();
        // toggleBookReadButtonBehavior();
    }
}

class Book {

    constructor(serialNo, title, author, pages, read) {
        this.serialNo = serialNo;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(parseInt(read));
    }

    toggleRead() {
        this.read = (this.read) ? false : true;    
    }
}

class MyLibrary {

    myLibrary = [];

    constructor() {
        this.hobbitBook = new Book(this.generateBookSerialNo(), 'The Hobbit', 'J.R.R. Tolkein', 295, false);
        this.addBookToLibrary(this.hobbitBook);
        this.hpBook = new Book (this.generateBookSerialNo(), 'Harry Potter', 'J.K. Rowling', 500, false);
        this.addBookToLibrary(this.hpBook);
        this.displayController = new DisplayController;        
    }

    generateBookSerialNo() {
        return (this.myLibrary.length == 0) ? 1: (this.myLibrary[this.myLibrary.length-1].serialNo + 1);
    }

    addBookToLibrary(book) {    
        this.myLibrary.push(book);
    }
    
}


let obj1 = new MyLibrary;
