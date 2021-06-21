import { html } from "../../node_modules/lit-html/lit-html.js"
import { getCarDetails } from "../api/data.js"
import { deleteRequest } from "../api/data.js"


function detailsTempl(car, delFunc, isOwner) {
    return html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}</li>
            </ul>
    
            <p class="description-para">${car.description}</p>
            ${isOwner ? html`
            <div class="listings-buttons">
                <a href="/edit/${car._id}" class="button-list">Edit</a>
                <a @click=${delFunc} href="javascript:void(0)" class="button-list">Delete</a>
            </div>` : ""}
        </div>
    </section>`
}

export async function detailsPage(ctx) {
    let currId = ctx.params.id;
    let currCar = await getCarDetails(currId);
    console.log(currCar);

    if (currCar._ownerId == sessionStorage.getItem("userId")) {
        ctx.render(detailsTempl(currCar, delFunc, true))
    } else {
        ctx.render(detailsTempl(currCar, delFunc, false))
    }


    async function delFunc() {
        let confirmed = confirm("Are you sure you want to delete this item ?")
        if (confirmed) {
            await deleteRequest(currId);
        }
        ctx.page.redirect("/allListings");
    }
}