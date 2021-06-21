import { html } from "../../node_modules/lit-html/lit-html.js"

import { searchBy } from "../api/data.js"

function searchTempl(cars, searchFunc) {
    let resArr = [];
    cars.forEach(c => resArr.push(carView(c)));

    function carView(car) {
       // console.log(car);
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
    <section id="search-cars">
        <h1>Filter by year</h1>
    
        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year"}>
            <button @click=${searchFunc} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
        <div class="listings">
            <!-- Display all records -->
    
            <!-- Display if there are no matches -->
            ${resArr.length == 0 ?
               html`<p class="no-cars"> No results.</p>` 
               : resArr}
        </div>
    </section>`
}

export async function searchPage(ctx) {
    let year = Number(ctx.querystring.split("=")[1])
    let data = [];
    if(!Number.isNaN(year)) {
         data = await searchBy(year);
    }
   
    ctx.render(searchTempl(data, searchFunc, year))
    
    function searchFunc() {
        let input = Number(document.getElementById("search-input").value);
        //let data = await searchBy(input)
        ctx.page.redirect("/search?data=" + input)
    }
    document.getElementById("search-input").value = "";
}