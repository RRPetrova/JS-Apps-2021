import { html } from "../../node_modules/lit-html/lit-html.js"

import { editReq, articleDetails } from "../api/data.js"


function editTempl(art, editFunc) {
    return html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${editFunc} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${art.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" .value=${art.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${art.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`
}

export async function editPage(ctx) {
    console.log("edPage");
    let artId = ctx.params.id;
    let currArt = await articleDetails(artId)
    //console.log(currMeme);
    ctx.render(editTempl(currArt, editFunc))

    async function editFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);

        let title = formData.get("title")
        let category = formData.get("category");
        let content = formData.get("content");

        if (title == "" || content == "" || category == "") {
            throw new Error("All fields shoud be filled");
        }

        if (category !== "JavaScript" && category !== "C#" && category !== "Java" && category !== "Python") {
            return alert("Please fill correct category")
        }
        let data = {
            title: title,
            category: category,
            content: content
        }

        await editReq(artId, data);
        ctx.page.redirect(`/details/${artId}`)
    }

}