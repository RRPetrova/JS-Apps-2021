import { html } from "../../node_modules/lit-html/lit-html.js"

import { createMovie } from "../api/data.js"

function createTempl(createFunc) {
    return html`
    <section id="add-movie">
        <form @submit=${createFunc} class="text-center border border-light p-5" action="#" method="">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>`
}

export async function createPage(ctx) {
    ctx.render(createTempl(createFunc));

    async function createFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let title = formData.get("title")
        let description = formData.get("description");
        let img = formData.get("imageUrl");

        if (title == "" || description == "" || img == "") {
          return  alert("All fields shoud be filled");
        }

        let data = {
            title: title,
            description: description,
            img: img
        }
        await createMovie(data);
        ctx.page.redirect("/");
    }

}