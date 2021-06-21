import { html } from "../../node_modules/lit-html/lit-html.js"

import { createMeme } from "../api/data.js"
import { notify } from "../notification.js"

function createHtmlTempl(createFunc) {
    return html`
<section id="create-meme">
    <form @submit=${createFunc} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`
}

export async function createPage(ctx) {
    ctx.render(createHtmlTempl(createFunc));

    async function createFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let title = formData.get("title")
        let description = formData.get("description");
        let imageUrl = formData.get("imageUrl");

        try {
            if (title == "" || description == "" || imageUrl == "") {
                throw new Error ("All fields shoud be filled");
            }

            let data = {
                title: title,
                description: description,
                imageUrl: imageUrl
            }
            await createMeme(data);
            ctx.page.redirect("/allMemes");
        } catch (error) {
            notify(error)
        }


    }
}