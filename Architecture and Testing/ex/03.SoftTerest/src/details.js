import { getIdeaById } from "./data.js";
import { e } from "./dom.js";


export function setupDetails(section, navig) {
    return showDetails;

    async function showDetails(id) {
        section.innerHTML = "";

        let idea = await getIdeaById(id);
        let card = createCard(idea);
        section.appendChild(card);

        return section;
    }
}


function createCard(idea) {
    let res = document.createDocumentFragment();
    let el1 = e("img", { className: "det-img", src: `${idea.img}` });
    res.appendChild(el1);

    let el2 =
        e("div", { className: "desc" },
            e("h2", { className: "display" - 5 }, `${idea.title}`),
            e("p", { className: "infoType" }, "Desription"),
            e("p", { clasName: "idea-description" }, `${idea.description}`)
        );
    res.appendChild(el2);
    let el3 = e("div", { className: "text-center" },
        e("a", { clasName: "btn-detb", href: "" }, "Delete"));
    res.appendChild(el3);

    return res;
}
