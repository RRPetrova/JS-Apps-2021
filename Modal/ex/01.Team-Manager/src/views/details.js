import { html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import {
    singleTeamDetailsById,
    requestToJoinTheTeam,
    getTeamInfoRequests
} from "../api/data.js"


function teamByIdTempl(team, joinFunc) {
    return html`
    <section id="team-home">
        <article class="layout">
            <img src=${team.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">3 Members</span>
                <div>
                    <a href="/edit/${team._id}" class="action">Edit team</a>
                    <a @click=${joinFunc} href="javascript:void(0)" class="action">Join team</a>
                    <a href="javascript:void(0)" class="action invert">Leave team</a>
                    Membership pending. <a href="javascript:void(0)">Cancel request</a>
                </div>
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                <ul class="tm-members">
                    <li>My Username</li>
                    <li>James<a href="#" class="tm-control action">Remove from team</a></li>
                    <li>Meowth<a href="#" class="tm-control action">Remove from team</a></li>
                </ul>
            </div>
            <div class="pad-large">
                <h3>Membership Requests</h3>
                <ul class="tm-members">
                    <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                            class="tm-control action">Decline</a></li>
                    <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                            class="tm-control action">Decline</a></li>
                </ul>
            </div>
        </article>
    </section>`
}


export async function teamDetailsPage(ctx) {
    let id = ctx.params.id;
    ctx.render(until(templLoading(id), html`
<article class="pad-large">
    <h1>Loading&hellip;</h1>
</article>`));
}

async function templLoading(id) {
    let userID = sessionStorage.getItem("userId")
    console.log(id);
    let [currTeam, requests] = await Promise.all([
        singleTeamDetailsById(id),
        getTeamInfoRequests(id)
    ])
    console.log("123");
    console.log(requests);
    console.log(currTeam);

    return teamByIdTempl(currTeam, joinFunc);

    // function templBtnsHtml() {
    //     if (userID == team._ownerId) {
    //         return html`<a href="/edit/${team._id}" class="action">Edit team</a>`;
    //     }
    // }

    async function joinFunc() {
        console.log(id);
        await requestToJoinTheTeam(id)
    }

}