import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import { logout } from "./api/data.js"

import { createPage } from './views/create.js';
import { homePage } from './views/home.js';
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { allMemesPage } from "./views/allMemes.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myProfilePage } from "./views/profile.js";

// import * as api from "./data.js";


let main = document.querySelector("main")

page("/", middleware, homePage);
page("/home", middleware, homePage);
page("/details/:id", middleware, detailsPage);
page("/create", middleware, createPage);
page("/edit/:id", middleware, editPage);
page("/register", middleware, registerPage)
page("/login", middleware, loginPage);
page("/allMemes", middleware, allMemesPage);
page("/myProfile", middleware, myProfilePage);


document.getElementById("logoutBtn").addEventListener("click", logoutFunc);
setUserNav();

page.start();

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let email = sessionStorage.getItem("email")
    document.getElementById("welcomeMsg").textContent = `Welcome, ${email}`;
    if (email != null) {
        document.querySelector(".user").style.display = "block"
        document.querySelector(".guest").style.display = "none"
    } else {
        document.querySelector(".user").style.display = "none"
        document.querySelector(".guest").style.display = "block"
    }
}

async function logoutFunc() {
    await logout();
    setUserNav();
    page.redirect("/")
}