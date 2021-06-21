import { html } from "../../node_modules/lit-html/lit-html.js"

import { home } from "../api/data.js"

function homePageHtmlTempl(data) {

    function articleView(art) {
        return html`
            <article>
                <h3>${art.title}</h3>
                <p>${art.content}</p>
                <a href="/details/${art._id}" class="btn details-btn">Details</a>
            </article>`
    }

    let js = data.find(e => e.category == "JavaScript")
    let java = data.find(e => e.category == "Java")
    let p = data.find(e => e.category == "Python")
    let c = data.find(e => e.category == "C#")
    console.log(js);

    return html`
        <section id="home-page" class="content">
            <h1>Recent Articles</h1>
            <section class="recent js">
                <h2>JavaScript</h2>
                ${js != null ? articleView(js) : html`<h3 class="no-articles">No articles yet</h3>`}
        
            </section>
            <section class="recent csharp">
                <h2>C#</h2>
                ${c != null ? articleView(c) : html`<h3 class="no-articles">No articles yet</h3>`}
        
            </section>
            <section class="recent java">
                <h2>Java</h2>
                ${java != null ? articleView(java) : html`<h3 class="no-articles">No articles yet</h3>`}
        
            </section>
            <section class="recent python">
                <h2>Python</h2>
                ${p != null ? articleView(p) : html`<h3 class="no-articles">No articles yet</h3>`}
        
        
        
            </section>
        </section>`
}



export async function homePage(ctx) {
  
    let data = await home();
    console.log(data);
    ctx.render(homePageHtmlTempl(data));
}