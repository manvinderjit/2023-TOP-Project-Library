// Array to store all book objects
const myLibrary = [];
const headerRowFields = ["S. No.", "Title", "Author", "Pages", "Read", "Remove"];
const bookListContainer = document.getElementById('book-list');
const addBookForm = document.getElementById('add-new-book');

const buttonShowBookForm = document.getElementById('show-add-book-form');
const buttonSubmitBookDetails = document.getElementById('submit-new-book');

let nextBookSerialNo;

buttonShowBookForm.addEventListener('click', () => addBookForm.classList.toggle('hide'));

buttonSubmitBookDetails.addEventListener("click", submitButtonBehavior);

function submitButtonBehavior(event) {
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

function removeBookButtonBehavior() {
    const buttonsRemoveBook = document.querySelectorAll('button[name="button-remove-book"]');
    buttonsRemoveBook.forEach((button) => {
        button.addEventListener('click', () => {
            removeBook(button.getAttribute('id'));            
        })
    })
}

function generateBookSerialNo() {
    return (myLibrary.length == 0) ? 1: (myLibrary[myLibrary.length-1].serialNo + 1);
}

function Book(title, author, pages, read) {    
    this.serialNo = generateBookSerialNo();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {    
    myLibrary.push(book);
}

function findBookIndexInMyLibrary(bookSerialNo) {
    return myLibrary.findIndex((bookObject) => {
        return bookObject['serialNo'] == bookSerialNo;
    });
}

function removeBook(bookSerialNo) {
    const bookIndex = findBookIndexInMyLibrary(bookSerialNo);
    myLibrary.splice(bookIndex, 1);
    displayAllBooksInLibrary();
}

function createHeaderRow () {
    
    let headerRow = document.createElement('div');
    headerRow.classList.add("book-row",  "heading-row");
    headerRowFields.forEach((field) => {
        let headerRowField = document.createElement('div');
        headerRowField.textContent = field;
        headerRow.appendChild(headerRowField);
    });
    return headerRow;
}

function createDivWithBookRemoveButton(bookSerialNo) {
    let fieldDiv = document.createElement('div');
    let removeBookButton = document.createElement('button'); 
    removeBookButton.textContent = "Remove";
    removeBookButton.type = "button";
    removeBookButton.id = bookSerialNo;
    removeBookButton.name = "button-remove-book";
    fieldDiv.appendChild(removeBookButton);
    return(fieldDiv);
}

function createBookRow(book, bookIndex) {

    let bookRow = document.createElement('div');
    bookRow.classList.add("book-row");    

    for(const property in book) {        
        let fieldDiv = document.createElement('div');
        fieldDiv.textContent = book[property];        
        bookRow.appendChild(fieldDiv);
    }

    bookRow.appendChild(createDivWithBookRemoveButton(book['serialNo']));

    return bookRow;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {        
        parent.removeChild(parent.firstChild);
    }
}

function displayAllBooksInLibrary() {
    
    removeAllChildNodes(bookListContainer);
    
    bookListContainer.appendChild(createHeaderRow());

    myLibrary.forEach((book) => {
        let bookIndex = (myLibrary.indexOf(book));
        bookListContainer.appendChild(createBookRow(book, bookIndex));
    });

    removeBookButtonBehavior();
}

const hobbitBook = new Book ('The Hobbit', 'J.R.R. Tolkein', 295, false);
addBookToLibrary(hobbitBook);
const hpBook = new Book ('Harry Potter', 'J.K. Rowling', 500, false);
addBookToLibrary(hpBook);

displayAllBooksInLibrary();
