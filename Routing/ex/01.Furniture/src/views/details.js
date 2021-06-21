import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { deleteRequest } from "../api.js";
import { getFurnitureId, deleteFurniture } from "../api/data.js";

function detailsTemplate(item, isOwner, delFunc) {
    console.log(item);
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${item.img} />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
            ${isOwner ? html`
            <div>
                <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
                <a @click=${delFunc} href="javascript:void(0)" class="btn btn-red">Delete</a>
            </div>` : ""}
        </div>
    </div>`}

export async function detailsPage(ctx) {
    let itemId = ctx.params.id;
    let item = await getFurnitureId(itemId);

    let token = sessionStorage.getItem("userId");

    if(token == item._ownerId) {
        ctx.render(detailsTemplate(item, true, delFunc));
    } else {
        ctx.render(detailsTemplate(item, false, delFunc));
    }
    

    async function delFunc() {
        let confirmed = confirm("Are you sure you want to delete this furniture ?")
        if (confirmed) {
            await deleteRequest(itemId);
        }
        ctx.page.redirect("/");
    }
}