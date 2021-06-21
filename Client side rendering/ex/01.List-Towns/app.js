import { html, render } from "./node_modules/lit-html/lit-html.js"

document.getElementById("btnLoadTowns").addEventListener("click", loadFunc);

function createLiOfInput(arrayData) {
    return html`
        <ul>
            ${arrayData.map(inp => html`<li>${inp}</li>`)}
        </ul>`
}

function loadFunc(ev) {
    ev.preventDefault()
    let innput = document.getElementById("towns").value;
    if (innput != "") {
        let arrInp = [];
        innput.split(", ").forEach(e => arrInp.push(e));
        let divToAppTo = document.getElementById("root");
        render(createLiOfInput(arrInp), divToAppTo);
        document.getElementById("towns").value = "";
    } else {
        return alert("Please eneter town's in the input field! :)")
    }
}


