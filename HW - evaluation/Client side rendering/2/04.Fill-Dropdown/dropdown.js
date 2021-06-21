import { html, render } from '../node_modules/lit-html/lit-html.js';
const addSubmit = document.querySelector('input[type=submit]');
const inputText = document.querySelector('#itemText');
const menu = document.getElementById('menu');

async function addItem() {

    const listItems = await getData();

    let currentItem = [];

    for (const key in listItems) {

        currentItem.push(template(listItems[key]));

    }

    render(currentItem, menu);

    addSubmit.addEventListener('click', onSubmit)

}

addItem()

async function getData() {

    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    if (response.ok) {
        const data = await response.json();
        return data
    }
}

const template = (input) => html`
<option value=${input._id}>${input.text}</option>
`;


async function onSubmit(event) {
    event.preventDefault();

    const town = {
        text: inputText.value
    };

    if (inputText.value == '') {
        return alert('All fields are require!');
    }

    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(town)
    });

    if (response.ok) {

        addItem();
    } else {
        const error = await response.json();
        alert(error.message)
    }

    inputText.value = '';
}



