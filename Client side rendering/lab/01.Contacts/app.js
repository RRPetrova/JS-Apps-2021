import { html, render } from "./node_modules/lit-html/lit-html.js"
import { contacts } from "./contacts.js";


let divCont = document.getElementById("contacts");
let cards = [];
contacts.forEach(c => {
    cards.push(createCardTempl(c));
})
render(cards, divCont)


function createCardTempl(data) {
    return html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button @click=${detailsFunc} class="detailsBtn">Details</button>
        <div class="details" id=${data.id}>
            <p>Phone number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        </div>
    </div>
</div>`;

}

function detailsFunc(ev) {
    let details = ev.target.parentNode.querySelector(".details");
    
    details.style.display == "block" ?
        details.style.display = "none" :
        details.style.display = "block";

}

