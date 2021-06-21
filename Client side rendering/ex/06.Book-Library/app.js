import { html, render } from "../node_modules/lit-html/lit-html.js"

solve();

function solve() {
    getRequest();

}


async function getRequest() {
    let resp = await fetch("http://localhost:3030/jsonstore/collections/books");
    let data = await resp.json();
    if (resp.status != 200) {
        console.error(data);
    }
    let listOfRows = Object.values(data);
    let templ = [];

    Object.entries(data).map(([k, v]) => Object.assign(v, { _id: k }))
    // console.log(Object.values(data));
    listOfRows.forEach(r => templ.push(createRow(r)));


    let tableView =
        html`
<button @click=${loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${templ}
    </tbody>
</table>`

    let addForm = () => html`
<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input @click=${addBook} type="submit" value="Submit">
</form>`

    function editForm(book) {
        return html`
<form id="edit-form">
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input id="submBtn" type="submit" value="Save">
</form>`
    }

    let layout = html`
    ${tableView}
    ${addForm()}`

    render(layout, document.querySelector("body"));

    function createRow(data) {
        return html`
        <tr>
            <td>${data.title}</td>
            <td>${data.author}</td>
            <td id=${data._id}>
                <button @click=${editFunction}>Edit</button>
                <button @click=${deleteFunction}>Delete</button>
            </td>
        </tr>`
    }


    async function editFunction(ev) {
        let idBook = ev.target.parentNode.id;
        console.log(idBook);
        let resp = await fetch("http://localhost:3030/jsonstore/collections/books/" + idBook);
        let data = await resp.json();

        if (resp.status != 200) {
            console.error(data);
        }

        console.log(data);
        let layout = html`
        ${tableView}
        ${editForm(data)}`
        render(layout, document.querySelector("body"));

        let titleField = document.querySelector("[name=title]")
        let authorField = document.querySelector("[name=author]")
        titleField.value = data.title;
        authorField.value = data.author;

        document.getElementById("submBtn").addEventListener("click", preWrite);

        async function preWrite(ev) {
            ev.preventDefault();
            //
            // let formData = new FormData(ev.target);
            //   let id = formData.get("id");
            let updBook = {
                title: titleField.value,
                author: authorField.value
            };
            // console.log(id);
            await fetch("http://localhost:3030/jsonstore/collections/books/" + idBook, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updBook)
            })

            titleField.value = "";
            authorField.value = "";
            getRequest()
        }


    }

    async function deleteFunction(ev) {
        let idBook = ev.target.parentNode.id;

        const confirmed = confirm("Are you sure u want to delete this book");
        if (confirmed) {
            await fetch("http://localhost:3030/jsonstore/collections/books/" + idBook, {
                method: "delete",
            })
            getRequest();
        }
    }

    async function addBook(ev) {
        ev.preventDefault();
        let titleField = document.querySelector("[name=title]")
        let authorField = document.querySelector("[name=author]")

        let newBook = {
            title: titleField.value,
            author: authorField.value
        };

        await fetch("http://localhost:3030/jsonstore/collections/books", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook)
        });

        titleField.value = "";
        authorField.value = "";
       getRequest()

    }


    function loadBooks() {
        getRequest() 
    }
}






