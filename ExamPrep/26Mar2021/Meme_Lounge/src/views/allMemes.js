import { html } from "../../node_modules/lit-html/lit-html.js"

import { getAllMemes } from "../api/data.js"

function allMemesHtmlTempl(data) {
    let arrMemes = [];
    data.forEach(m => arrMemes.push(memeTempl(m)));

    function memeTempl(meme) {
        return html`
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${meme.title}</p>
                    <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
                </div>
                <div id="data-buttons">
                    <a class="button" href="/details/${meme._id}">Details</a>
                </div>
            </div>
        </div>`
    }

    return html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            <!-- Display : All memes in database ( If any ) -->
           ${arrMemes}
            <!-- Display : If there are no memes in database -->
            ${arrMemes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : ""}
        </div>
    </section>`
}


export async function allMemesPage(ctx) {
    let data = await getAllMemes();
    console.log(data);
    ctx.render(allMemesHtmlTempl(data));
}