import { html } from "../../node_modules/lit-html/lit-html.js"

import { myCars } from "../api/data.js"

function myCarsTempl(data) {

    let myCarsArr = [];
    data.forEach(c => myCarsArr.push(myCarView(c)));


    function myCarView(car) {
        return html`
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`
    }
    return html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
    
            <!-- Display all records -->
    
            ${myCarsArr}
            <!-- Display if there are no records -->
            ${myCarsArr == 0 ? html`<p class="no-cars"> You haven't listed any cars yet.</p>` : ""}
        </div>
    </section>`
}

export async function myCarsPage(ctx) {
    let data = await myCars();
    ctx.render(myCarsTempl(data));
}