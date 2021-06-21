import {showHome} from "./home.js"
import {showMovieDetails} from "./movieDetails.js"

let main;
let section;

export function setupAddMovie(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector("form");
    form.addEventListener("submit", crNewMovie);

}

export async function showAddMovie() {
    main.innerHTML = "";
    main.appendChild(section);
}

async function crNewMovie(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let imageUrl = formData.get("imageUrl");

    if(title = "", title = "", imageUrl = "") {
        return alert("All fields are mandatory!")
    }

    const resp = await fetch("http://localhost:3030/data/movies", {
        method: "post",
        headers: { 
            "Content-Type": "application/json",
            'X-Authorization': sessionStorage.getItem("authToken"),
     },
        body: JSON.stringify({ title: title, description: description, imageUrl: imageUrl })
    });

    let data = resp.json();
    if (resp.ok == false) {
        return alert(data.message);
    } else {
       showMovieDetails();
       // showHome();
    }
}