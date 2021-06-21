import { html, render } from '../node_modules/lit-html/lit-html.js';

let loadBooksBtn = document.getElementById('loadBooks');
loadBooksBtn.addEventListener('click', loadBooks);

let bookTemplate = (book) => html`<tr>
<td>${book[1].title}</td>
<td>${book[1].author}</td>
<td>
    <button @click=${editFunc(book[1]._id)}>Edit</button>
    <button @click=${deleteFunc(book[1]._id)}>Delete</button>
</td>
</tr>`;

async function loadBooks() {
    let tbody = document.querySelector('tbody');

    let url = `http://localhost:3030/jsonstore/collections/books`;

    let response = await fetch(url);

    let data = Object.entries(await response.json());

    let inner = data.map(bookTemplate);

    render(inner, tbody);
}

async function editFunc(id) {
    let form = document.querySelector(`h3`);
    form.textContent = `EDIT FORM`;

    let titleInput = document.querySelector(`input[name="title"]`);
    let authorInput = document.querySelector(`input[name="author"]`);

    titleInput.value = book.title;
    authorInput.value = book.author;

    let saveBtn = document.querySelector(`form > button`);
    saveBtn.textContent = `SAVE`;
    saveBtn.addEventListener(`click`, async function SaveBtnFunc(e) {
        e.preventDefault();
        let book = {
            author: authorInput.value,
            title: titleInput.value
        };

        const url = `http://localhost:3030/jsonstore/collections/books/` + id;

        const response = await fetch(url, {
            method: `PUT`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });

        titleInput.value = ``;
        authorInput.value = ``;
        loadBooks();
    });

}

async function deleteFunc(id) {
    let url = `http://localhost:3030/jsonstore/collections/books/` + id;

    const resposne = await fetch(url, {
        method: `delete`
    });
    loadBooks();
}

let submitBtn = document.querySelector('input[type="submit"]');
submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    if (submitBtn.value == `Submit`) {

        let titleInput = document.querySelector(`input[name="title"]`);
        let authorInput = document.querySelector(`input[name="author"]`);

        let book = {
            author: authorInput.value,
            title: titleInput.value
        };

        const url = `http://localhost:3030/jsonstore/collections/books`;

        const response = await fetch(url, {
            method: `post`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });

        const data = await response.json();

        titleInput.value = ``;
        authorInput.value = ``;
        loadBooks();
    }
});
