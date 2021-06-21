import { html } from "../../node_modules/lit-html/lit-html.js"

import { detailsOffer , deleteOffer} from "../api/data.js"

function detailsTempl(offer, delFunc) {
    return html`
    <div class="offer-details">
        <h1>${offer.name}</h1>
        <div class="info">
            <img src="https://i1.t4s.cz/products/3023295-602/under-armour-ua-w-hovr-phantom-se-trek-263676-3023295-603.jpg"
                alt="">
            <div class="description">${offer.description}
                <br>
                <br>
                <p class="price">$${offer.price}</p>
            </div>
        </div>
        <div class="actions">
            <a href="/edit/${offer._id}">Edit</a>
            <a @click=${delFunc}>Delete</a>
            <a href="/buy/${offer._id}">Buy</a>
            <span>You bought it</span>
        </div>
    </div>`
}

export async function detailsPage(ctx) {
    console.log("asda");
    let currId = ctx.params.id;
    console.log(currId);
    let currShoe = await detailsOffer(currId)
    ctx.render(detailsTempl(currShoe, delFunc))

    async function delFunc() {
        let confirmed = confirm("Are you sure you want to delete this meme ?")
        if (confirmed) {
            await deleteOffer(currId);
        }
        ctx.page.redirect("/homePageLogged");
    }
}