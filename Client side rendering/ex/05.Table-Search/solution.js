import { html, render } from "../node_modules/lit-html/lit-html.js"

function solve() {
   window.onload = getRequest();
   document.getElementById('searchBtn').addEventListener('click', onClick);

   async function onClick() {
      let field = document.getElementById("searchField").value;
      if(field == "") {
         alert("Please enter search criteria in the box !")
      }
      let rows = Array.from(document.querySelectorAll("tbody tr")); 
      for (const tr of rows) {
         if (tr.textContent.toLowerCase().includes(field.toLowerCase()) && field != "") {
            tr.setAttribute("class", "select");
         } else  {
            tr.removeAttribute("class");

         }
      }
      document.getElementById("searchField").value = ""
   }
}

async function getRequest() {
   let resp = await fetch("http://localhost:3030/jsonstore/advanced/table");
   let data = await resp.json();
   if (resp.status != 200) {
      console.error(data);
   }
   let listOfRows = Object.values(data)
   let result = [];

   listOfRows.forEach(r => result.push(createRow(r)));

   render(result, document.querySelector("tbody"));
   return listOfRows;
}

function createRow(data) {
   return html`
   <tr>
      <td>${data.firstName} ${data.lastName}</td>
      <td>${data.email}</td>
      <td>${data.course}</td>
   </tr>`
}

solve();