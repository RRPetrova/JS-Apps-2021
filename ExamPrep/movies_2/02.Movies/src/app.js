import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import { logout } from "./api/data.js"

import { homePage } from './views/home.js';
import { loginPage } from "./views/login.js";
import { createPage } from './views/create.js';
 import { registerPage } from "./views/register.js";

import { detailsPage } from "./views/details.js";
 import { editPage } from "./views/edit.js";
// import { myProfilePage } from "./views/profile.js";

// import * as api from "./data.js";


let main = document.querySelector("main")

page("/", middleware, homePage);
page("/home", middleware, homePage);
 page("/details/:id", middleware, detailsPage);
page("/create", middleware, createPage);
page("/edit/:id", middleware, editPage);
 page("/register", middleware, registerPage)
page("/login", middleware, loginPage);
 
// page("/myProfile", middleware, myProfilePage);


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
        [...document.querySelectorAll(".nav-item-user")].forEach(e => e.style.display = "block");
        [...document.querySelectorAll(".nav-item-guest")].forEach(e => e.style.display = "none");
    } else {
        [...document.querySelectorAll(".nav-item-user")].forEach(e => e.style.display = "none");
        [...document.querySelectorAll(".nav-item-guest")].forEach(e => e.style.display = "block");
    }
}

async function logoutFunc() {
    await logout();
    setUserNav();
    page.redirect("/login")
}