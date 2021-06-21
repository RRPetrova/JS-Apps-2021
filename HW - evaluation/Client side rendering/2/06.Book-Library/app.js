import { html, render } from '../node_modules/lit-html/lit-html.js';

function books() {

    const body = document.querySelector('body');

    const tbody = document.createElement('tbody');
    const table = document.createElement('table');
    const btnLoad = document.createElement('button');
    btnLoad.textContent = 'LOAD ALL BOOKS';
    btnLoad.id = 'loadBooks';

    btnLoad.addEventListener('click', async () => {
        await renderBook();
    });

    body.appendChild(btnLoad);

    body.appendChild(table);

    const inputData = {
        title: 'Title',
        author: 'Author',
        action: 'Action'
    }

    const templateThead = (input) => html`
    <thead>
        <tr>
            <th>${input.title}</th>
            <th>${input.author}</th>
            <th>${input.action}</th>
        </tr>
    </thead>
    `;

    const theadResult = templateThead(inputData);
    render(theadResult, table);

    const addForm = document.createElement('form');
    addForm.id = 'add-form';
    body.appendChild(addForm);

    const editForm = document.createElement('form');
    editForm.id = 'edit-form';
    editForm.style.display = 'none';
    body.appendChild(editForm);

    const tempAddForm = () => html`
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input @click=${onSubmit} type="submit" value="Submit">
    `;

    render(tempAddForm(), addForm);

    const tempEditForm = () => html`
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Save">
    `;

    render(tempEditForm(), editForm);


    async function getAllBooks() {

        const response = await fetch('http://localhost:3030/jsonstore/collections/books');

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    }

    const tempTbody = (input) => html`
    <tr>
        <td>${input.title}</td>
        <td>${input.author}</td>
        <td>
            <button @click=${onClickEdit} id=${input._id}>Edit</button>
            <button @click=${onClickDel} id=${input._id}>Delete</button>
        </td>
    </tr>
    `;

    async function onClickEdit(event) {
        event.preventDefault();
        const currId = event.target.id;
        const editForm = document.getElementById('edit-form');
        editForm.style.display = 'block';

        const btnSave = editForm.querySelector('input[type=submit]');
        btnSave.addEventListener('click', async (event) => {
            event.preventDefault();
            const title = editForm.querySelector('input[name=title]');
            const author = editForm.querySelector('input[name=author]');

            const data = {
                title: title.value,
                author: author.value
            }

            putBook(data, currId);
            editForm.style.display = 'none';

            title.value = '';
            author.value = '';
            await renderBook();
        });
    }

    async function renderBook() {

        const allBooks = await getAllBooks();

        let resultAllBooks = []

        for (const key in allBooks) {
            resultAllBooks.push(tempTbody(allBooks[key]))
        }

        table.appendChild(tbody);

        render(resultAllBooks, tbody);

    }


    async function onClickDel(event) {
        event.preventDefault();
        
        const currId = event.target.id;
        
        const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + currId, {
            method: 'delete'
        });
        await response.json();
        await renderBook();
    }




  async  function onSubmit(event) {

       // event.preventDefault();
        const inputForm = document.querySelector('#add-form');
        const dataForm = new FormData(inputForm);
        const title = dataForm.get('title');
        const author = dataForm.get('author');

        if (title == '' || author == '') {
            return alert('All fields are require!');
        }
        const data = {
            title: title,
            author: author
        }

        postBook(data);
        await renderBook();
    };


    async function postBook(data) {

        const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            books();
        } else {
            const error = await response.json();
            alert(error.message)
        }
       await renderBook();
       
    }

    async function putBook(data, id) {

        const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            await response.json();

        } else {
            const error = await response.json();
            alert(error.message)
        }
       await renderBook();
    }

}
books()