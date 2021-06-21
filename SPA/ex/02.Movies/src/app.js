import { setupHome, showHome } from "./home.js";
import { setupMovieDetails } from "./movieDetails.js";
import { showSignUp, signUpSetup } from "./signUp.js";
import { setupLogin, showLogin } from "./login.js";
import { setupAddMovie, showAddMovie } from "./addMovie.js";
import { setupEdit } from "./editMovie.js";

let main = document.querySelector("main");

let navigationBtns = {
    "moviesBtn": showHome,
    "crMovieBtn": showAddMovie,
    "loginBtn": showLogin,
    "regBtn": showSignUp,
}

setupSection("home-page", setupHome);
setupSection("add-movie", setupAddMovie);
setupSection("movie-example", setupMovieDetails);
setupSection("edit-movie", setupEdit);
setupSection("form-login", setupLogin);
setupSection("form-sign-up", signUpSetup);

setupNavigation();
showHome();

function setupSection(sectId, setup) {
    let section = document.getElementById(sectId);
    setup(main, section);
}

function setupNavigation() {
    let token = sessionStorage.getItem("authToken");

    if (token != null) {
        document.getElementById("welcomeMsg").textContent = `Welcome, ${sessionStorage.getItem("email")}`
        Array.from(document.querySelectorAll("nav .user")).forEach(v => v.style.display = "block")
        Array.from(document.querySelectorAll("nav .guest")).forEach(v => v.style.display = "none")
    } else {
        Array.from(document.querySelectorAll("nav .user")).forEach(v => v.style.display = "none")
        Array.from(document.querySelectorAll("nav .guest")).forEach(v => v.style.display = "block")
    }
    document.getElementById("crMovieBtn").addEventListener("click", addMovieFunc)
    document.querySelector("nav").addEventListener("click", clickedBtnFunc);
    document.getElementById("LogoutBtn").addEventListener("click", logoutFunc);
}

function addMovieFunc(ev) {
    ev.preventDefault();
    showAddMovie();
}

function clickedBtnFunc(ev) {
    let currBtnFunc = navigationBtns[ev.target.id];
    if (typeof currBtnFunc == "function") {
        ev.preventDefault();
        currBtnFunc();
    }
}

async function logoutFunc() {
    let token = sessionStorage.getItem("authToken");

    const resp = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': token
        },
    });
    let data = await resp.json();


    if (resp.ok == false) {
        return alert(data.message);
    } else {
        console.log("ok");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("userID");
        Array.from(document.querySelectorAll("nav .user")).forEach(v => v.style.display = "none");
        Array.from(document.querySelectorAll("nav .guest")).forEach(v => v.style.display = "block");
        showHome();

    }

}