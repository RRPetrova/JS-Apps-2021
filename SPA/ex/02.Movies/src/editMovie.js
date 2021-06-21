import { showMovieDetails } from "./movieDetails.js";
import { showHome } from "./home.js";

async function getMovieById(id) {
    const resp = await fetch('http://localhost:3030/data/movies/' + id);
    const data = await resp.json();

    return data;
}

let main;
let section;
let movieId;

export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    console.log(section);

    let form = section.querySelector("form");
    form.addEventListener("submit", editMovie);
}

export async function showEdit(id) {
    main.innerHTML = "";
    main.appendChild(section);
    movieId = id;
    const currMovie = await getMovieById(id);

    section.querySelector('[name="title"]').value = currMovie.title;
    section.querySelector('[name="description"]').value = currMovie.description;
    section.querySelector('[name="imageUrl"]').value = currMovie.imageUrl
}

async function editMovie(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let imageUrl = formData.get("imageUrl");

    const body = JSON.stringify({
        title: title,
        description: description,
        imageUrl: imageUrl
    });

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return alert('You\'re not logged in!');
    }
    console.log(movieId);
    try {
        const resp = await fetch('http://localhost:3030/data/movies/' + movieId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body
        });

        if (resp.status == 200) {
            showHome();
        } else {
            const error = await resp.json();
            throw new Error(error.message);
        }
    } catch (err) {
        alert(err.message);
        console.error(err.message);
    }

}