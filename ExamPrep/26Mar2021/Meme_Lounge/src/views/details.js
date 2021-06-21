import { html } from "../../node_modules/lit-html/lit-html.js"

import { getMemeById, deleteMeme } from "../api/data.js"

function memeDetailsTempl(meme, isOwner, delFunc) {
    return html`
    <!-- Details Meme Page (for guests and logged users) -->
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}
    
        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${meme.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                ${isOwner ? html`
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button @click=${delFunc} class="button danger">Delete</button>`
           : ""}
            </div>
        </div>
    </section>`
}


export async function detailsPage(ctx) {
    let memeId = ctx.params.id;
    let currMeme = await getMemeById(memeId)
    let token = sessionStorage.getItem("userId");

    if (token == currMeme._ownerId) {
        ctx.render(memeDetailsTempl(currMeme, true, delFunc));
    } else {
        ctx.render(memeDetailsTempl(currMeme, false, delFunc));
    }

    async function delFunc() {
        let confirmed = confirm("Are you sure you want to delete this meme ?")
        if (confirmed) {
            await deleteMeme(memeId);
        }
        ctx.page.redirect("/allMemes");
    }

}
