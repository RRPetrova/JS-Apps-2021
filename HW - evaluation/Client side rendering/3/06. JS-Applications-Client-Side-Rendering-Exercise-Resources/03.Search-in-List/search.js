import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js'
import { classMap } from '../node_modules/lit-html/directives/class-map.js'

let resultTowns = [];

const townTemplate = (town) => html`<li class="${resultTowns.includes(town) ? 'active' : ''}">${town}</li>`

showTowns();

function showTowns() {
   let divTowns = document.getElementById(`towns`);
   const townsList = html`
      <ul>
      ${towns.map(townTemplate)}
      </ul>`;

   render(townsList, divTowns);
}

document.querySelector(`button`).addEventListener(`click`, update);

function update() {
   let searchText = document.getElementById(`searchText`).value.toLowerCase();

   if (searchText) {
      let divResult = document.getElementById(`result`);
      resultTowns = towns.filter(t => t.toLowerCase().includes(searchText));
      const resultList = html`
      <ul>
      ${resultTowns.length} matches found.
      </ul>`;

      render(resultList, divResult);
      showTowns();
   }
}
