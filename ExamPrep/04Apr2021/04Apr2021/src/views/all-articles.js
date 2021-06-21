import { html } from "../../node_modules/lit-html/lit-html.js"

import { getAllArticles } from "../api/data.js"

function allArticlesHtmlTempl(data) {
    let arrArt = [];
    data.forEach(m => arrArt.push(artTempl(m)));

    function artTempl(art) {
        return html`
    <a class="article-preview" href="/details/${art._id}">
        <article>
            <h3>Topic: <span>${art.title}</span></h3>
            <p>Category: <span>${art.category}</span></p>
        </article>
    </a>`
    }

    return html`
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
    
        ${arrArt.length == 0 ? 
        html`<h3 class="no-articles">No articles yet</h3>` :
                    arrArt}
        
    </section>`
}


export async function allArticlesPage(ctx) {
    let data = await getAllArticles();
    console.log(data);
    ctx.render(allArticlesHtmlTempl(data));
}