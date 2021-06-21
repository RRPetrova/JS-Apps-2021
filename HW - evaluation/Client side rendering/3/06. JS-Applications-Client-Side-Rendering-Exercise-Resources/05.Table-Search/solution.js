import { html, render } from '../node_modules/lit-html/lit-html.js'
let table = document.querySelector('tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);

updateTable();

let rowTempalte = (user) => html` 
<tr>
<td>${user[1].firstName + ' ' + user[1].lastName}</td>
<td>${user[1].email}</td>
<td>${user[1].course}</td>
</tr>`;

async function updateTable() {
   let url = 'http://localhost:3030/jsonstore/advanced/table';

   let response = await fetch(url);

   let data = Object.entries(await response.json());

   let newTable = html`${data.map(rowTempalte)}`;

   render(newTable, table)
}

function onClick() {
   let inputField = document.getElementById(`searchField`);

   let input = inputField.value.toLowerCase();

   let rows = Array.from(document.querySelectorAll('tr'));
   rows.shift();
   rows.pop();

   rows.forEach(row => {
      row.className = '';
   })


   rows.forEach(row => {
      row.childNodes.forEach(x => {
         if (x.tagName == 'TD') {
            if(x.textContent.toLowerCase().includes(input)){
               x.parentNode.classList.add('select');
            }
         }
      })
   });

   inputField.value = '';
}