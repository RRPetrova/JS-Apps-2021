import { html } from "../../node_modules/lit-html/lit-html.js"

import { articleDetails, deleteRequest } from "../api/data.js"

function artDetailsTempl(art, isOwner, delFunc, backFunc) {
    return html`
    <section id="details-page" class="content details">
        <h1>${art.title}</h1>
    
        <div class="details-content">
            <strong>Published in category JavaScript</strong>
            <p>${art.content}</p>
    
            <div class="buttons">
                ${isOwner ?
                html`<a @click=${delFunc} href="javascript:void(0)" class="btn delete">Delete</a>
                <a href="/edit/${art._id}" class="btn edit">Edit</a>` :
            html`<a @click=${backFunc} href="javascript:void(0)" class="btn edit">Back</a>`}
            </div>
        </div>
    </section>`
}


export async function detailsPage(ctx) {
    console.log(ctx);
    let artId = ctx.params.id;
    let currArt = await articleDetails(artId)
    let token = sessionStorage.getItem("userId");

    if (token == currArt._ownerId) {
        ctx.render(artDetailsTempl(currArt, true, delFunc, backFunc));
    } else {
        ctx.render(artDetailsTempl(currArt, false, delFunc, backFunc));
    }

    function backFunc() {
        ctx.render(window.history.back())
    }


    async function delFunc() {
        let confirmed = confirm("Are you sure you want to delete this article ?")
        if (confirmed) {
            await deleteRequest(artId);
        }
        ctx.page.redirect("/");
    }

}
