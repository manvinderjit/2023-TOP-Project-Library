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
    }

    generateBookSerialNo() {
        return (this.myLibrary.length == 0) ? 1: (this.myLibrary[this.myLibrary.length-1].serialNo + 1);
    }

    generateBookObject(title, author, pages, read) {
        let newBook = new Book (
                                    this.generateBookSerialNo(),
                                    title,
                                    author,
                                    pages,
                                    read                            
                                );
        this.addBookToLibrary(newBook);         
    }
    
    addBookToLibrary(book) {    
        return this.myLibrary.push(book);        
    }

    findBookIndexInMyLibrary(bookSerialNo) {
        return this.myLibrary.findIndex((bookObject) => {
            return bookObject['serialNo'] == bookSerialNo;
        });
    }

    removeBook(bookSerialNo) {
        const bookIndex = this.findBookIndexInMyLibrary(bookSerialNo);
        this.myLibrary.splice(bookIndex, 1);        
        this.displayAllBooksInLibrary();
    }

    toggleBookReadStatus(bookSerialNo) {
        const bookIndex = this.findBookIndexInMyLibrary(bookSerialNo);    
        (this.myLibrary[bookIndex].toggleRead());        
        this.displayAllBooksInLibrary();        
    }

}

class DisplayController extends MyLibrary {

    constructor() {
        super();
        this.headerRowFields = ["S. No.", "Title", "Author", "Pages", "Read", "Remove", "Toggle"];
        this.bookListContainer = document.getElementById('book-list');
        this.addBookForm = document.getElementById('add-new-book');

        this.buttonShowBookForm = document.getElementById('show-add-book-form');
        this.buttonSubmitBookDetails = document.getElementById('submit-new-book');

        this.buttonShowBookForm.addEventListener('click', () => this.addBookForm.classList.toggle('hide'));
        this.buttonSubmitBookDetails.addEventListener("click", this.submitButtonBehavior);
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

    submitButtonBehavior = (event) => {
        event.preventDefault();        
        this.submitButtonFunctionality (                                    
                                    document.getElementById('title').value,
                                    document.getElementById('author').value,
                                    document.getElementById('pages').value,
                                    document.querySelector('input[name="read"]:checked').value
                                );        
    };

    submitButtonFunctionality = (title, author, pages, read) => {        
        this.generateBookObject(title, author, pages, read);  
        this.displayAllBooksInLibrary();
    }

    removeBookButtonBehavior() {
        const buttonsRemoveBook = document.querySelectorAll('button[name="button-remove-book"]');
        buttonsRemoveBook.forEach((button) => {
            button.addEventListener('click', () => {
                this.removeBook(button.getAttribute('id'));            
            })
        })
    }

    toggleBookReadButtonBehavior() {
        const buttonsToggleBookStatus = document.querySelectorAll('button[name="button-toggle-book-status"]');
        buttonsToggleBookStatus.forEach((button) => {
            button.addEventListener('click', () => {            
                this.toggleBookReadStatus(button.getAttribute('id'));
            })
        })
    }

    createDivWithBookRemoveButton(bookSerialNo) {
        let fieldDiv = document.createElement('div');
        let removeBookButton = document.createElement('button'); 
        removeBookButton.textContent = "Remove";
        removeBookButton.type = "button";
        removeBookButton.id = bookSerialNo;
        removeBookButton.name = "button-remove-book";
        fieldDiv.appendChild(removeBookButton);
        return(fieldDiv);
    }

    createDivWithToggleBookReadButton(bookSerialNo) {
        let fieldDiv = document.createElement('div');
        let removeBookButton = document.createElement('button'); 
        removeBookButton.textContent = "Toggle Read";
        removeBookButton.type = "button";
        removeBookButton.id = bookSerialNo;
        removeBookButton.name = "button-toggle-book-status";
        fieldDiv.appendChild(removeBookButton);
        return(fieldDiv);
    }

    createBookRow(book) {

        let bookRow = document.createElement('div');
        bookRow.classList.add("book-row");    
    
        for(const property in book) {  
            if(property !== 'toggleRead') {
                let fieldDiv = document.createElement('div');
                fieldDiv.textContent = book[property];        
                bookRow.appendChild(fieldDiv);    
            }
        }
    
        bookRow.appendChild(this.createDivWithBookRemoveButton(book['serialNo']));
        bookRow.appendChild(this.createDivWithToggleBookReadButton(book['serialNo']));    
    
        return bookRow;
    }

    displayAllBooksInLibrary() {            
        this.removeAllChildNodes(this.bookListContainer);
        
        this.bookListContainer.appendChild(this.createHeaderRow());
    
        this.myLibrary.forEach((book) => {
            let bookIndex = (this.myLibrary.indexOf(book));
            this.bookListContainer.appendChild(this.createBookRow(book, bookIndex));
        });
    
        this.removeBookButtonBehavior();
        this.toggleBookReadButtonBehavior();
    }
}

let obj = new DisplayController;