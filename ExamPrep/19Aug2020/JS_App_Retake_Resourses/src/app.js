import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import { logout } from "./api/data.js"

import { createPage } from './views/create.js';
import { homePage } from './views/homeP.js';
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { homePageLoggedUser } from "./views/homeLogged.js";
 import { detailsPage } from "./views/details.js";
// import { detailsPage } from "./views/details.js";
// import { editPage } from "./views/edit.js";

// // import * as api from "./data.js";


let main = document.querySelector("main")

page("/", middleware, homePage);
// page("/dashboard", middleware, dashboardPage);
// page("/details/:id", middleware, detailsPage);
page("/create", middleware, createPage);
page("/homePageLogged", middleware, homePageLoggedUser);
// page("/edit/:id", middleware, editPage);
page("/register", middleware, registerPage)
page("/login", middleware, loginPage);
page("/details/:id", middleware, detailsPage);


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
    if (email != null) {
        document.querySelectorAll(".user").forEach(li => li.style.display = "block")
        document.querySelectorAll(".site-logo").forEach(li => li.style.display = "none")
       document.getElementById("emailNavig").firstChild.textContent = `Welcome, ${email} \| \n`;
    } else {
        document.querySelectorAll(".user").forEach(li => li.style.display = "none")
        document.querySelectorAll(".site-logo").forEach(li => li.style.display = "list-item")
    }
}

async function logoutFunc() {
    await logout();
    setUserNav();
    page.redirect("/")
}