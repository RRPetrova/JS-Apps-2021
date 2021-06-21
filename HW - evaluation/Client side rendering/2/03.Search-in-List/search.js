import { towns } from './towns.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

function search() {
   const btn = document.getElementById('search');
   const divResult = document.getElementById('result');

   const divTowns = document.getElementById('towns');
   const ulEl = document.createElement('ul');
   divTowns.appendChild(ulEl);

   const townsTemplate = (town) => html`
   <li>${town}</li>
   `;

   rendering(towns);

   function rendering(input) {

      const result = input.map(townsTemplate);

      render(result, ulEl);
   }

   const townList = Array.from(divTowns.querySelectorAll('li'));

   btn.addEventListener('click', (event) => {
      const input = document.getElementById('searchText').value.toLowerCase();

      let sum = 0;

      for (let i = 0; i < townList.length; i++) {
   
         let currTown = townList[i].textContent.toLowerCase();
   
         if (currTown.includes(input) && input !== '') {
   
            townList[i].style.fontWeight = 'bold';
            townList[i].style.textDecoration = 'underline';
            sum++
   
         } else {
   
            townList[i].style.fontWeight = '';
            townList[i].style.textDecoration = '';
   
         }
   
      }
   
      divResult.textContent = `${sum} matches found`;
     console.log('ok');

   });
}
search()




