const booksContainerId = 'books';
const booksListWrapperClass = 'wrapper__books-list';
const hiddenClass = 'wrapper__books-list--hidden';
class Book {
    constructor(title, author, priority, category) {
        this.title = title;
        this.author = author;
        this.priority = priority;
        this.category = category;
    }
}

class BookStore {
    static addBook(book) {
        const books = this.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = this.getBooks();
        const filteredBooks = books.filter(book => book.title !== title);
        localStorage.setItem('books', JSON.stringify(filteredBooks));
    }

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
}

class BooksList {
    static addBook(book) {
        const bookRow = this.createBookRow(book);
        document.getElementById(booksContainerId).appendChild(bookRow);
        this.showBooksList();
    }

    static removeBook(book) {
        book.parentElement.parentElement.parentElement.remove();
        this.showBooksList();
    }

    static displayBooks() {
        BookStore.getBooks().forEach(book => this.addBook(book));
        this.showBooksList();
    }

    static showBooksList() {
        const books = BookStore.getBooks();
        const booksListWrapper = document.querySelector(`.${booksListWrapperClass}`);

        if (books.length > 0) {
            booksListWrapper.classList.remove(hiddenClass);
        }
        else {
            booksListWrapper.classList.add(hiddenClass);
        }
    }

    static createBookRow(book) {
        const bookRow = document.createElement('div');
        bookRow.innerHTML = `
                <span>${book.title}</span>
                <span>${book.author}</span>
                <span>${book.priority}</span>
                <span>${book.category}</span>
                <span>
                <button class="button button--remove" type="button">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                </span>`;
        bookRow.classList.add('books__list', 'books__list--row');
        return bookRow;
    }
}

class Form {
    static clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('priority').value = '';
        document.getElementById('category').value = '-1';
    }

    static validate() {
        const book = new Book(
            document.form.title.value,
            document.form.author.value,
            document.form.priority.value,
            document.form.category.value
        );

        if (!book.title || book.title.length < 1) {
            alert('Wpisz poprawnie tytuł (Min 1 znak)!');
            return;
        }
        if (!book.author || book.author.length < 3) {
            alert('Wpisz poprawnie nazwę autora (Min 3 znaki)!');
            return;
        }
        if (!book.priority || book.priority < 1 || book.priority > 5) {
            alert('Wpisz poprawnie priorytet (Min 1, Max 5)!');
            return;
        }
        if (book.category === '-1') {
            alert('Wybierz poprawnie kategorię!');
            return;
        }

        BookStore.addBook(book);
        BooksList.addBook(book);
        this.clearForm();
        removeButtonEventListeners();
        return;
    }

    static addEventListeners() {
        document
            .querySelector('.button--add')
            .addEventListener('click', () => this.validate());
    }
}

removeButtonEventListeners = () => {
    document.querySelectorAll('.button--remove').forEach((book) =>
        book.addEventListener('click', (e) => {
        BookStore.removeBook(
            e.target.parentElement.parentElement.parentElement.firstChild.nextSibling.outerText
        );
        BooksList.removeBook(e.target);
        })
    );
}

const init = () => {
    window.addEventListener('load', () => {
        BooksList.displayBooks();
        Form.addEventListeners();
        removeButtonEventListeners();
    });
};

init();
