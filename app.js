// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks(){
        const StoredBooks = [
            {
            title: 'book one',
            author: 'john doe',
            isbn: '98567234'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert (message,className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        
        // vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handles Storage (here it is in browser)

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                book.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) =>{
    
    // prevent actual submit
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate
    if(title === ''  || author === '' || isbn === ''){
        UI.showAlert('please fill in all fields', 'danger');
    } else{
    
    // instantiate book
    const book = new Book(title,author,isbn);
    
    // add Book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.clearFields();
    } 
});

// Event : Remove a Book (from storege and UI)
document.querySelector('#book-list').addEventListener('click', (e) =>
{
    UI.deleteBook(e.target);

    // Show success message
    UI.showAlert('Book Removed', 'info');
})