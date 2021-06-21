import { html, render } from "../node_modules/lit-html/lit-html.js"
import { towns } from "./towns.js";

function townDisplay(towns, inputF) {
   return html`
      <ul>
         ${towns.map(t => boxTownsWhenMatchInput(t, inputF))}
      </ul>
      </div>`
}

function boxTownsWhenMatchInput(town, input) {
   return html`
   <li class=${(input != "" && town.toLowerCase().includes(input.toLowerCase())) ? "active" : ""}>
      ${town}</li>`
}


function visualize() {

   let res = townDisplay(towns, "");
   let divToAppTo = document.getElementById("towns");
   render(res, divToAppTo);
}
visualize();

document.querySelector("button").addEventListener("click", search);

function search() {
   let inpFieldVal = document.getElementById("searchText").value;
   if (inpFieldVal == "") {
      return alert("Please fill the search box !")
   }
   let res = townDisplay(towns,inpFieldVal);
   let divToAppTo = document.getElementById("towns");
   render(res, divToAppTo);
   document.getElementById("searchText").value = "";
  // visualize()
}
