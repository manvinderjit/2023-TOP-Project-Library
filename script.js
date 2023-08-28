// Array to store all book objects
const myLibrary = [];
const headerRowFields = ["S. No.", "Title", "Author", "Pages", "Read", "Remove", "Toggle"];
const bookListContainer = document.getElementById('book-list');
const addBookForm = document.getElementById('add-new-book');

const buttonShowBookForm = document.getElementById('show-add-book-form');
const buttonSubmitBookDetails = document.getElementById('submit-new-book');

// buttonShowBookForm.addEventListener('click', () => addBookForm.classList.toggle('hide'));
// buttonSubmitBookDetails.addEventListener("click", submitButtonBehavior);

class DisplayController {

    createHeaderRow() {
    
        let headerRow = document.createElement('div');
        headerRow.classList.add("book-row",  "heading-row");
        headerRowFields.forEach((field) => {
            let headerRowField = document.createElement('div');
            headerRowField.textContent = field;
            headerRow.appendChild(headerRowField);
        });
        return headerRow;
    }

    submitButtonBehavior(event) {
        event.preventDefault();
        const newBook = new Book (
                                    document.getElementById('title').value,
                                    document.getElementById('author').value,
                                    document.getElementById('pages').value,
                                    document.querySelector('input[name="read"]:checked').value
                                );    
        addBookToLibrary(newBook);
        displayAllBooksInLibrary();
    };

    removeBookButtonBehavior() {
        const buttonsRemoveBook = document.querySelectorAll('button[name="button-remove-book"]');
        buttonsRemoveBook.forEach((button) => {
            button.addEventListener('click', () => {
                removeBook(button.getAttribute('id'));            
            })
        })
    }

    toggleBookReadButtonBehavior() {
        const buttonsToggleBookStatus = document.querySelectorAll('button[name="button-toggle-book-status"]');
        buttonsToggleBookStatus.forEach((button) => {
            button.addEventListener('click', () => {            
                toggleBookReadStatus(button.getAttribute('id'));
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

    createBookRow(book, bookIndex) {

        let bookRow = document.createElement('div');
        bookRow.classList.add("book-row");    
    
        for(const property in book) {  
            if(property !== 'toggleRead') {
                let fieldDiv = document.createElement('div');
                fieldDiv.textContent = book[property];        
                bookRow.appendChild(fieldDiv);    
            }
        }
    
        bookRow.appendChild(createDivWithBookRemoveButton(book['serialNo']));
        bookRow.appendChild(createDivWithToggleBookReadButton(book['serialNo']));    
    
        return bookRow;
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {        
            parent.removeChild(parent.firstChild);
        }
    }

    displayAllBooksInLibrary() {
    
        removeAllChildNodes(bookListContainer);
        
        bookListContainer.appendChild(createHeaderRow());
    
        myLibrary.forEach((book) => {
            let bookIndex = (myLibrary.indexOf(book));
            bookListContainer.appendChild(createBookRow(book, bookIndex));
        });
    
        removeBookButtonBehavior();
        toggleBookReadButtonBehavior();
    }
}

class MyLibrary extends DisplayController{

    constructor() {
        displayAllBooksInLibrary();
        nextBookSerialNo;
    }
    
    generateBookSerialNo() {
        return (myLibrary.length == 0) ? 1: (myLibrary[myLibrary.length-1].serialNo + 1);
    }

    addBookToLibrary(book) {    
        myLibrary.push(book);
    }

    findBookIndexInMyLibrary(bookSerialNo) {
        return myLibrary.findIndex((bookObject) => {
            return bookObject['serialNo'] == bookSerialNo;
        });
    }

    removeBook(bookSerialNo) {
        const bookIndex = findBookIndexInMyLibrary(bookSerialNo);
        myLibrary.splice(bookIndex, 1);
        displayAllBooksInLibrary();
    }

    toggleBookReadStatus(bookSerialNo) {
        const bookIndex = findBookIndexInMyLibrary(bookSerialNo);    
        (myLibrary[bookIndex].toggleRead());
        displayAllBooksInLibrary();
    }

}

class Book extends MyLibrary {

    constructor(title, author, pages, read) {
        this.serialNo = generateBookSerialNo();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(parseInt(read));
    }

    toggleRead() {
        this.read = (this.read) ? false : true;    
    }
}





const hobbitBook = new Book ('The Hobbit', 'J.R.R. Tolkein', 295, false);
addBookToLibrary(hobbitBook);
const hpBook = new Book ('Harry Potter', 'J.K. Rowling', 500, false);
addBookToLibrary(hpBook);

