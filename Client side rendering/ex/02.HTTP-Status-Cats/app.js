import { html, render } from "../node_modules/lit-html/lit-html.js"

import { cats } from "./catSeeder.js";


let divCats = document.getElementById("allCats");

let catArr = []
cats.forEach(c => catArr.push(createCatTempl(c)));
let res = html`<ul>${catArr}</ul>`;
render(res, divCats)


function createCatTempl(catInfo) {
    return html`
        <li>
            <img src="./images/${catInfo.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${detailsFunc} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${catInfo.id}>
                    <h4>Status Code: ${catInfo.statusCode}</h4>
                    <p>${catInfo.statusMessage}</p>
                </div>
            </div>
        </li>`
}

function detailsFunc(ev) {
    let details = ev.target.parentNode.querySelector(".status");

    details.style.display == "block" ?
        details.style.display = "none" :
        details.style.display = "block";
}


