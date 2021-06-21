import { html } from "../../node_modules/lit-html/lit-html.js"
import { createTeam } from "../api/data.js"

function createTeamTempl(createFunc, err) {
    return html`<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${createFunc} id="create-form" class="main-form pad-large">
            ${err ?
                 html`<div class="error">${err.message}</div>` : 
                 ""}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`
}


export async function createTeamPage(ctx) {
    ctx.render(createTeamTempl(createFunc));

    async function createFunc(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let name = formData.get("name")
        let logoUrl = formData.get("logoUrl")
        let description = formData.get("description")

        try {
            if(name.length < 4) {
                throw new Error ("Team Name must be at lest 4 characters") ;
            }

            if(logoUrl == "") {
                throw new Error("Logo Url is required to be filled");
            }
            if (description.length < 10) {
                throw new Error ("Description must be at least 10 characters!");
            }

            let data = {
                name: name,
                logoUrl: logoUrl,
                description: description
            }
            await createTeam(data)
            ctx.page.redirect("/details/" + team._id)
        } catch (error) {
            ctx.render(createTeamTempl(createFunc, error))
        }
        
    }
}