import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import { logout } from "./api/data.js"

import { homePage } from './views/home.js';
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { allListingsPage } from "./views/allListings.js";
import { createPage } from './views/create.js';
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myCarsPage } from "./views/my-cars.js";
import { searchPage } from "./views/search.js";

//import * as api from "../src/api/data.js";

let main = document.getElementById("site-content")

page("/", middleware, homePage);
page("/home", middleware, homePage);
page("/details/:id", middleware, detailsPage);
page("/create", middleware, createPage);
page("/edit/:id", middleware, editPage);
page("/register", middleware, registerPage)
page("/login", middleware, loginPage);
page("/allListings", middleware, allListingsPage);
page("/my-cars", middleware, myCarsPage);
page("/search", middleware, searchPage);

document.getElementById("logoutBtn").addEventListener("click", logoutFunc);
setUserNav();
page.start();

function middleware(ctx, next) {

    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let username = sessionStorage.getItem("username")
    //block = vis
    if (username != null) {
        document.getElementById("usernameNav").textContent = `Welcome ${username}`;
        Array.from(document.getElementById("profile").children).forEach(ch => ch.style.display = "block");
        [...document.getElementById("guest").children].forEach(ch => ch.style.display = "none");
    } else {
        Array.from(document.getElementById("profile").children).forEach(ch => ch.style.display = "none");
        [...document.getElementById("guest").children].forEach(ch => ch.style.display = "block");
    }
}

async function logoutFunc() {
    await logout();
    setUserNav();
    page.redirect("/")
}