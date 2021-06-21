function library() {
    document.getElementById("loadBooks").addEventListener("click", showBooks);
    document.getElementById("createForm").addEventListener("submit", createBook);
    document.querySelector("table").addEventListener("click", clicked);
    document.getElementById("editForm").addEventListener("submit", updateBook);
    showBooks();
}
library();

async function showBooks() {
    let books = await request("http://localhost:3030/jsonstore/collections/books");
    let allBooks = [];
    Object.entries(books).forEach(b => {
        allBooks.push(createTable(b))
    })
    console.log(allBooks);
    document.querySelector("tbody").innerHTML = allBooks.join("");

    function createTable([id, book]) {
        let skeleton = `
    <tr id="${id}">
           <td>${book.title}</td>
           <td>${book.author}</td>
           <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
                </td>
     </tr>`
        console.log(skeleton);
        return skeleton;
    }
}


async function createBook(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    if (formData.get("title") == "" || formData.get("author") == "") {
        return alert("All fields are mandatory!")
    }

    let book = {
        title: formData.get("title"),
        author: formData.get("author")
    }

    await request("http://localhost:3030/jsonstore/collections/books", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    });
    ev.target.reset();
}

async function updateBook(ev) {
    ev.preventDefault();

    let formData = new FormData(ev.target);
    let id = formData.get("id");
    let book = {
        title: formData.get("title"),
        author: formData.get("author")
    };
    console.log(id);
    await request("http://localhost:3030/jsonstore/collections/books/" + id, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    })

    document.getElementById("createForm").style.display = "block";
    document.getElementById("editForm").style.display = "none";
    ev.target.reset();
}

async function editBookById(id) {
    let currBook = await request("http://localhost:3030/jsonstore/collections/books/" + id)
    console.log(currBook);
    document.querySelector('#editForm [name="id"]').value = id;
    document.querySelector('#editForm [name="title"]').value = currBook.title;
    document.querySelector('#editForm [name="author"]').value = currBook.author;
}

async function deleteBook(id) {
    await request("http://localhost:3030/jsonstore/collections/books/" + id, {
        method: "delete",
    })
    showBooks();
}

function clicked(ev) {
    if (ev.target.nodeName == "BUTTON") {
        if (ev.target.textContent == "Delete") {
            const confirmed = confirm("Are you sure u want to delete this book");
            if (confirmed) {
                deleteBook(ev.target.parentNode.parentNode.id);
            }
        } else {
            document.getElementById("createForm").style.display = "none";
            document.getElementById("editForm").style.display = "block";
            editBookById(ev.target.parentNode.parentNode.id);
        }
    }
}

async function request(url, options) {
    let resp = await fetch(url, options);
    let data = await resp.json();
    if (resp.ok == false) {
        throw new Error(alert(data.message))
    }
    return data;
}