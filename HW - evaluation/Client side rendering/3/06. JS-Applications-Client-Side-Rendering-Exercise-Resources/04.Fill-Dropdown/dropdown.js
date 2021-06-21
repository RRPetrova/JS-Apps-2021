import { html, render } from '../node_modules/lit-html/lit-html.js';


const selectTemplate = (select) => html`<option value="${select[1]._id}">${select[1].text}</option>`;
let menu = document.querySelector(`div`);

updateSelect();

async function updateSelect(){
    let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');

    let data = await response.json();

    data = Object.entries(data);

    data.map(x => console.log(x[1]));

    let result = html`<select id="menu">
    ${data.map(selectTemplate)};
    </select>`;

    render(result, menu)
}

document.querySelector('input[type="submit"]').addEventListener(`click`, async (event) => {
    event.preventDefault();
    let itemText = document.getElementById(`itemText`).value;

    let item = {text: itemText};

    let response = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });

    let data = await response.json();

    updateSelect();
});