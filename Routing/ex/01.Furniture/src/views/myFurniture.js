import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getMyFurniture } from "../api/data.js"

function myFurnitureTempl(data) {
    let arr = [];
    data.forEach(f => arr.push(currFurniture(f)));
    console.log(arr);
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${arr}
    </div>`
}

function currFurniture(item) {
    return html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href='/details/${item._id}' class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`}

export async function myFurniturePage(ctx) {
    let data = await getMyFurniture();

    ctx.render(myFurnitureTempl(data))

}