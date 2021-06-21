import { html } from "../../node_modules/lit-html/lit-html.js"

import { editMeme } from "../api/data.js"
import { notify } from "../notification.js"

function editTempl(meme, editFunc) {
    return html`
<!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
<section id="edit-meme">
    <form @submit=${editFunc} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"
                .value=${meme.description}> </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`
}

export async function editPage(ctx) {
    console.log("edPage");
    let memeId = ctx.params.id;
    let currMeme = await editMeme(memeId)
    console.log(currMeme);
    ctx.render(editTempl(currMeme, editFunc))

    async function editFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);

        let title = formData.get("title")
        let description = formData.get("description");
        let imageUrl = formData.get("imageUrl");
        try {
            if (title == "" || description == "" || imageUrl == "") {
                throw new Error("All fields shoud be filled");
            }
            let data = {
                title: title,
                description: description,
                imageUrl: imageUrl
            }

            await editMeme(memeId, data);
            ctx.page.redirect(`/details/${memeId}`)
        } catch (error) {
           notify(error)
        }

    }

}