import { getIdeas } from "./data.js";
import { e } from "./dom.js";


export function setupDashboard(section, navig) {
    section.addEventListener("click", (ev) => {
        ev.preventDefault();
        if(ev.target.classList.contains("btn")) {
            let id = ev.target.id;
            navig.goTo("details", id);
        }
    })
    return showDashboard;

    async function showDashboard() {
        section.innerHTML = "";
        let ideas = await getIdeas();
        console.log(ideas);
        if (ideas.length == 0) {
            section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
        } else {
            ideas.forEach(c => {
                section.appendChild(htmlPreviewCardIdea(c));
            });
        }
        return section;
    }
}

function htmlPreviewCardIdea(idea) {
    let divToAppendTo = document.createElement("div");
    divToAppendTo.className = "card overflow-hidden current-card details";
    divToAppendTo.style.width = "20rem";
    divToAppendTo.style.height = "18rem";

    divToAppendTo.innerHTML =
        `<div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a id=${idea._id} class="btn" href="">Details</a>`


    return divToAppendTo;
}

