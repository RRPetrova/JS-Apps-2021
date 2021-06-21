import { html } from "../../node_modules/lit-html/lit-html.js"

import { editMovie , movieDetails} from "../api/data.js"

function editTempl(movie, editFunc) {
    return html`
<section id="edit-movie">
    <form @submit=${editFunc} class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description"
                .value=${movie.description}></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value=${movie.img} name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>`
}


export async function editPage(ctx) {
    let id = ctx.params.id;
    console.log(ctx);
    let currMovie = await movieDetails(id);
    ctx.render(editTempl(currMovie, editFunc))


    async function editFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);

        let title = formData.get("title")
        let description = formData.get("description");
        let imageUrl = formData.get("imageUrl");
        if (title == "" || description == "" || imageUrl == "") {
            return alert("All fields shoud be filled");
        }
        let data = {
            title: title,
            description: description,
            img: imageUrl
        }

        await editMovie(id, data);
        ctx.page.redirect(`/details/${id}`)
    }
}