import { html, render } from "../node_modules/lit-html/lit-html.js"



function createTempl(data) {
    return html`
    <option value="${data._id}">${data.text}</option>`;
}

function updateData(data) {
    let res = [];
    data.forEach(d => res.push(createTempl(d)));
    render(res, document.getElementById("menu"));
}

async function getRequest() {
    document.querySelector("form").addEventListener("submit",(ev) => addNewInput(ev, list))

    let resp = await fetch("http://localhost:3030/jsonstore/advanced/dropdown");
    let data = await resp.json();
    if (resp.status != 200) {
        console.error(data);
    }
    let list = Object.values(data)
    updateData(list);
}

async function addNewInput(ev, list) {
    ev.preventDefault();
    
    let inp = document.getElementById("itemText").value;
    if (inp == "") {
        alert("Please fill the text box")
    } else {
        let response = await fetch("http://localhost:3030/jsonstore/advanced/dropdown", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: inp
            })
        });
        let data = await response.json();

        if (response.status != 200) {
            console.error(data);
        } else {
            document.getElementById("itemText").value = "";
            list.push(data);
            updateData(list);
            return alert(`${inp} added. Click the drop down.`)
        }


    }
}

