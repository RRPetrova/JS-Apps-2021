import { html, render } from '../node_modules/lit-html/lit-html.js';
const tbody = document.querySelector('.container tbody');

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   const students = await getData();

   let result = [];

   for (const key in students) {
     result.push(template(students[key]));
   }

   render(result,tbody);

   function onClick() {
   
      const rowsArr = document.querySelectorAll('tbody tr');
      let input = document.getElementById('searchField');

      for (let i = 0; i < rowsArr.length; i++) {
         let currItem = rowsArr[i];

         if (currItem.textContent.toLocaleLowerCase().includes(input.value.toLowerCase())) {

            currItem.setAttribute('class', 'select');
           
         } else {

            currItem.removeAttribute('class');
         }
      }
      input.value = '';
      
   }
}
solve()

async function getData() {

   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   if (response.ok) {
      const data = response.json();
      return data;
   }
}

const template = (input) => html`
<tr>
   <td>${input.firstName} ${input.lastName}</td>
   <td>${input.email}</td>
   <td>${input.course}</td>
</tr>
`;
