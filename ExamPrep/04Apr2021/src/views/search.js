import { html } from "../../node_modules/lit-html/lit-html.js"

import { search } from "../api/data.js"

function searchTempl(articles, searchFunc) {
    let artArr = [];
    articles.forEach(a => artArr.push(artView(a)));

    function artView(art) {
        return html`
    <a class="article-preview" href="/details/${art._id}">
        <article>
            <h3>Topic: <span>${art.title}</span></h3>
            <p>Category: <span>${art.category}</span></p>
        </article>
    </a>`
    }


    return html`
    <section id="search-page" class="content">
        <h1>Search</h1>
        <form id="search-form">
            <p class="field search">
                <input id="search-input" type="text" placeholder="Search by article title" name="search">
            </p>
            <p class="field submit">
                <input @click=${searchFunc} class="btn submit" type="submit" value="Search">
            </p>
        </form>
        <div class="search-container">
            ${artArr.length == 0 ?
            html`<h3 class="no-articles">No matching articles</h3>` :
            artArr}
        </div>
    </section>`
}

export async function searchPage(ctx) {
    console.log(ctx);
    let inp = ctx.querystring.split("=")[1];
    let data = [];
    if (inp != undefined) {
        data = await search(inp);
    }
    console.log(data);
    ctx.render(searchTempl(data, searchFunc, inp))

    function searchFunc(ev) {
        ev.preventDefault();
        let input = document.getElementById("search-input").value;
        //let data = await searchBy(input)
        ctx.page.redirect("/search?data=" + input)
    }
    document.getElementById("search-input").value = "";
}