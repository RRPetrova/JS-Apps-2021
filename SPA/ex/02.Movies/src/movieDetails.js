import { showHome } from "./home.js";
import { setupEdit, showEdit } from "./editMovie.js";

async function getMovieById(id) {
    let resp = await fetch("http://localhost:3030/data/movies/" + id)
    let data = await resp.json();
    return data;
}
let main;
let section;

function crMovieView(movie, numLikes, ownLikes) {

    let userId = sessionStorage.getItem("userID");

    let crFDiv = document.createElement("div");
    crFDiv.className = "container";

    let crSecDiv = document.createElement("div");
    crSecDiv.className = "row bg-light text-dark";

    let crH1 = document.createElement("h1");
    crH1.textContent = "Movie title: " + `${movie.title}`;
    crSecDiv.appendChild(crH1);

    let crImgDiv = document.createElement("div");
    crImgDiv.className = "col-md-8"
    let crImg = document.createElement("img");
    crImg.className = "img-thumbnail";
    crImg.src = `${movie.img}`
    crImg.alt = "Movie";
    crImgDiv.appendChild(crImg);
    crSecDiv.appendChild(crImgDiv);

    let crDivDescr = document.createElement("div");
    crDivDescr.className = "col-md-4 text-center";
    let crH3 = document.createElement("h3");
    crH3.className = "my-3 ";
    crH3.textContent = "Movie Description";
    crDivDescr.appendChild(crH3)
    let crP = document.createElement("p");
    crP.textContent = `${movie.description}`;
    crDivDescr.appendChild(crP)

    if (userId != null) {
        if (userId == movie._ownerId) {
            let btnDelCr = document.createElement("a");
            btnDelCr.className = "btn btn-danger";
            btnDelCr.href = "#"
            btnDelCr.textContent = "Delete";
            btnDelCr.addEventListener("click", (ev) => delFunc(ev, movie._id))
            crDivDescr.appendChild(btnDelCr)

            let editBtnCr = document.createElement("a");
            editBtnCr.className = "btn btn-warning";
            editBtnCr.href = "#"
            editBtnCr.textContent = "Edit";
            editBtnCr.addEventListener("click",() => showEdit(movie._id))
            crDivDescr.appendChild(editBtnCr)

        } else if (ownLikes.length == 0) {
            let likeBtnCr = document.createElement("a");
            likeBtnCr.className = "btn btn-primary";
            likeBtnCr.href = "#"
            likeBtnCr.textContent = "Like";
            likeBtnCr.addEventListener("click", likeFunc)
            crDivDescr.appendChild(likeBtnCr)
            console.log(likeBtnCr);
        }
    }
    let sp = document.createElement("span");
    sp.className = "enrolled-span"
    if (numLikes == 1) {
        sp.textContent = `${numLikes} like`;
    } else {
        sp.textContent = `${numLikes} likes`;
    }

    crDivDescr.appendChild(sp)
    crSecDiv.appendChild(crDivDescr);
    crFDiv.appendChild(crSecDiv);

    return crFDiv;

    async function likeFunc(ev) {
        let resp = await fetch("http://localhost:3030/data/likes", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.getItem("authToken")
            },
            body: JSON.stringify({ movieId: movie._id })
        });
        let data = await resp.json();

        if (resp.ok == false) {
            return alert(data.message);
        } else {
            ev.target.remove();
            numLikes++;
            //btn like textcont
        }
    }

}


export function setupMovieDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showMovieDetails(id) {
    section.innerHTML = "";
    main.innerHTML = "";
    main.appendChild(section);

    let [currMovie, allLikes, userLikes] = await Promise.all([
        getMovieById(id),
        getAllLikesByMovieId(id),
        getLikesFromUser(id),
    ]);

    let movie = crMovieView(currMovie, allLikes, userLikes);
    section.appendChild(movie);
}

async function delFunc(ev, id) {
    ev.preventDefault();
   
    let confirmed = confirm("Are you sure if you want to delete this movie");
    if (confirmed) {
        let resp = await fetch("http://localhost:3030/data/movies/" + id, {
            method: "delete",
            headers: { 'X-Authorization': sessionStorage.getItem("authToken"), }
        })
        if(resp.ok) {
            showHome();
        } else {
            alert( await resp.json().message)
        }
    }
}

async function getAllLikesByMovieId(id) {
    let resp = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count `)
    let data = resp.json();

    return data;
}

async function getLikesFromUser(id) {
    let resp = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${sessionStorage.getItem("userID")}%22`)
    let data = resp.json();

    return data;
}


