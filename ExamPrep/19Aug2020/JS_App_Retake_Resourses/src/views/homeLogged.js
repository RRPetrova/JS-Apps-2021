import { html } from "../../node_modules/lit-html/lit-html.js"

import { getAllShoes } from "../api/data.js"

function homeLoggedTempl(data) {
    let arrShoes = [];
    Object.entries(data).forEach(e=>arrShoes.push(shoeTempl(e[1])));
    //data.forEach(s => arrShoes.push(shoeTempl(s)))

    function shoeTempl(shoe) {
        return html`
    <div class="shoe">
        <img src="${shoe.imageUrl}">
        <h3>${shoe.name}</h3>
        <a href="/details/${shoe._id}">Buy it for $${shoe.price}</a>
    </div>`
    }

    return html`
    <div class="shoes">
    ${arrShoes.length == 0 ? 
    html`<h2>No shoes to display. Be the first to create a new offer...</h2>` :
    arrShoes} 
    </div>`
}

export async function homePageLoggedUser(ctx) {
    let data = await getAllShoes();
    
    ctx.render(homeLoggedTempl(data))
}
