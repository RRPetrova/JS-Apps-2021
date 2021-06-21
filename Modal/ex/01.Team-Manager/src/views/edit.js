import { html } from "../../node_modules/lit-html/lit-html.js";
import { editTeam, singleTeamDetailsById } from "../api/data.js";
import { until } from "../../node_modules/lit-html/directives/until.js";

function editTemplHtml(editFunc, currTeam, err) {
    return html`
    <section id="edit">
        <article class="narrow">
            <header class="pad-med">
                <h1>Edit Team</h1>
            </header>
            <form @submit=${editFunc} id="edit-form" class="main-form pad-large">
                ${err ? html`<div class="error">${err.message}</div>` : ""}
                <label>Team name: <input type="text" name="name" .value=${currTeam.name}></label>
                <label>Logo URL: <input type="text" name="logoUrl" .value=${currTeam.logoUrl}></label>
                <label>Description: <textarea name="description" .value=${currTeam.description}></textarea></label>
                <input class="action cta" type="submit" value="Save Changes">
            </form>
        </article>
    </section>`
}

export async function editTeamPage(ctx) {
    let id = ctx.params.id;
    let currTeam = await singleTeamDetailsById(id);

    ctx.render(until(editTemplHtml(editFunc, currTeam)), html`
    <article class="pad-large">
        <h1>Loading&hellip;</h1>
    </article>`);

    async function editFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let name = formData.get("name");
        let logoUrl = formData.get("logoUrl");
        let description = formData.get("description");

        try {
            if (name.length < 4) {
                throw new Error("Team Name must be at lest 4 characters");
            }

            if (logoUrl == "") {
                throw new Error("Logo Url is required to be filled");
            }
            if (description.length < 10) {
                throw new Error("Description must be at least 10 characters!");
            }
            let data = {
                name: name,
                logoUrl: logoUrl,
                description: description
            }
            await editTeam(id, data)
            ctx.page.redirect("/details/" + id);
        } catch (error) {
            ctx.render(editTemplHtml(editFunc, error));
        }
    }
}




