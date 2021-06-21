import { html } from "../../node_modules/lit-html/lit-html.js"

import { myMemes } from "../api/data.js"

function profileHtml(data, username, email, gender) {
    let arrMyMemesTempl = [];
    data.forEach(m => arrMyMemesTempl.push(memeTempl(m)))

        let pic = "";
        gender == "female" ? pic = `./images/female.png` : pic = `./images/male.png`

    function memeTempl(meme) {
        return html`
        <div class="user-meme">
            <p class="user-meme-title">${meme.title}</p>
            <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>`
    }

    return html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="${pic}">
            <div class="user-content">
                <p>Username: ${username}</p>
                <p>Email: ${email}</p>
                <p>My memes count: ${arrMyMemesTempl.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${arrMyMemesTempl.length == 0 ?
         html`<p class="no-memes">No memes in database.</p>` :
            arrMyMemesTempl}
        </div>
    </section>`




}

export async function myProfilePage(ctx) {
    let username = sessionStorage.getItem("username");
    let email = sessionStorage.getItem("email");
    let gender = sessionStorage.getItem("gender");

    let data = await myMemes();

    ctx.render(profileHtml(data, username, email, gender))
}