import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyFurniture } from '../api/data.js';

const myFurnitureTemplate = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${data.map(itemTemplate)}
</div>`

const itemTemplate = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`

export async function myPage(ctx) {
    ctx.render(html`<p class="loading">Loading</p>`);

    const userId = sessionStorage.getItem('userId');
    const data = await getMyFurniture(userId);

    ctx.render(myFurnitureTemplate(data));
}
