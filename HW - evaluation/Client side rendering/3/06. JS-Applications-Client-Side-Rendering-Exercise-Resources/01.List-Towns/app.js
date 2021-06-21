// let btn = document.getElementById(`btnLoadTowns`);
// let root = document.getElementById(`root`);

// btn.addEventListener(`click`, (e) => {
//     e.preventDefault();
//     root.innerHTML = '';

//     let inputArr = document.getElementById(`towns`).value.split(', ');
//     let ul = document.createElement(`ul`);

//     inputArr.forEach(town => {
//         let li = document.createElement(`li`);
//         li.textContent = town;
//         ul.appendChild(li);
//     });

//     root.appendChild(ul);
// })

import { html, render } from '../node_modules/lit-html/lit-html.js';

const listTemplate = (data) => html`
        <ul>
    ${data.map(t => html`<li>${t}</li>`)}
</ul>`;

document.getElementById(`btnLoadTowns`).addEventListener(`click`, updateList);

function updateList(event) {
    event.preventDefault();
    const townsAsString = document.getElementById(`towns`).value;
    const root = document.getElementById(`root`);

    const towns = townsAsString.split(', ').map(x => x.trim());

    const result = listTemplate(towns);

    render(result, root);
}