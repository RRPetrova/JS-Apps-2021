import { html } from '../../node_modules/lit-html/lit-html.js';
import {deleteFurniture, getFurnitureById} from '../api/data.js'


const detailsTemplate = (data, isOwner, onDelete) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${data.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        ${isOwner ? html`
        <div>
            <a href=${`/edit/${data._id}`} class="btn btn-info">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>` : ''}
    </div>
</div>`

export async function detailsPage(ctx) {
    ctx.render(html`<p class="loading">Loading</p>`);

    const item = await getFurnitureById(ctx.params.id);
    const userId = sessionStorage.getItem('userId')
    
    ctx.render(detailsTemplate(item, userId == item._ownerId, onDelete));

    async function onDelete () {
        const confirmed = confirm('Are you sure you want to delete this item?')
        if(confirmed) {
            await deleteFurniture(item._id);
            ctx.page.redirect('/');
        }
    }
}