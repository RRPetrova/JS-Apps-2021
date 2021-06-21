import { showMovieDetails } from "./movieDetails.js"

async function getMovies() {
    let resp = await fetch("http://localhost:3030/data/movies");
    let data = await resp.json();
    return data;
}

function crMovie(movie) {
    let elem = document.createElement("div");
    elem.className = "card mb-4";
    elem.innerHTML =
        `<img class="card-img-top" src="${movie.img}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
              <button id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </div>`;
    return elem;
}

let main;
let section;
let container;

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    container = section.querySelector(".card-deck.d-flex.justify-content-center")

    container.addEventListener("click", detailsFunc);
}

export async function showHome() {
    container.innerHTML = "Loading...";
    main.innerHTML = "";
    main.appendChild(section);
    let movData = await getMovies();
  //  console.log(movData);
    let allMoviesDet = movData.map(crMovie);

    let fragm = document.createDocumentFragment();
    allMoviesDet.forEach(m => fragm.appendChild(m));
    container.innerHTML = "";
    container.appendChild(fragm);
}

function detailsFunc(ev) {
    if (ev.target.classList.contains("btn-info")) {
        showMovieDetails(ev.target.id)
    }
}