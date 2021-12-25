window.addEventListener('DOMContentLoaded', () =>{
    showBooks();
    document.getElementById("button").addEventListener('click', () =>{
        addBook();
    });
    function validate() {
        var title = document.form.title.value;
        var author = document.form.author.value;
        var priority = document.form.priority.value;
        var category = document.form.category.value;
        if(title == null || title == "" || title.length < 1){
            alert("Wpisz poprawnie tytuł (Min 1 znak)!");
            return false;
        } else if (author == null || author == "" || author.length < 3) {
            alert("Wpisz poprawnie nazwę autora (Min 3 znaki)!");
            return false;
        } else if (priority < 1 || priority > 5) {
            alert("Wybierz poprawnie priorytet (Zakres 1-5)!");
            return false;
        } else if (category == -1) {
            alert("Wybierz kategorię z listy");
            return false
        } else return true;
    }

    function showBooks() {
        console.log(JSON.parse(localStorage.getItem('books')));
        console.table(JSON.parse(localStorage.getItem('books')));

        const books = getBooks();
        books.forEach((book) => bookList(book));
    }

    function getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    function bookList(book) {
        const bookRow = document.createElement("tr");

        bookRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.priority}</td>
        <td>${book.category}</td>`;

        document.getElementById("books").appendChild(bookRow);
    }

    function addBook() {
        if(validate() == true) {
            let book = {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                priority: document.getElementById('priority').value,
                category: document.getElementById('category').value
            }

            var newBooksData = book;
            if(localStorage.getItem('books') == null){
                localStorage.setItem('books', '[]');
            }
            var oldBooksData = JSON.parse(localStorage.getItem('books'));
            oldBooksData.push(newBooksData);
            localStorage.setItem('books', JSON.stringify(oldBooksData));

            bookList(book);

            document.getElementById('title').value = '';
            document.getElementById('author').value = '';
            document.getElementById('priority').value = '';
            document.getElementById('category').value = -1;
        }
    }

})