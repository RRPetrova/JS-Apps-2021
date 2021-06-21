import { html } from "../../node_modules/lit-html/lit-html.js"

import { getAllListings , getSize} from "../api/data.js"

function allListingsHtml(data, currPage, pages) {

    let arrListings = [];
    data.forEach(c => arrListings.push(singleListTempl(c)));

    function singleListTempl(car) {
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
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
        <div>
            ${currPage == 1 ? 
            "" : 
            html`<a class="button-list" href="/allListings?page=${currPage-1}">&lt; Prev</a>`}
            Page ${currPage} / ${pages} 
            ${currPage == pages ?
             "" :
            html`<a class="button-list" href="/allListings?page=${currPage+1}">&gt; Next</a>`}
        </div>
            <!-- Display all records -->
            ${arrListings}
            <!-- Display if there are no records  -->
           ${arrListings.length  == 0 ? 
            html`<p class="no-cars">No cars in database.</p>` : ""}
        </div>
    </section>`
}


export async function allListingsPage(ctx) {
    let count = await getSize();
    let pages = Math.ceil(count / 3);
    let currPage = Number(ctx.querystring.split("=")[1]);
    if (Number.isNaN(currPage) || Number(currPage) == 0) {
        currPage = 1;
    }
    

    console.log(pages);
    let data = await getAllListings(currPage)
    ctx.render(allListingsHtml(data, currPage, pages));
}