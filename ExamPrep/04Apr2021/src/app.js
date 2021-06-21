import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import { logout } from "./api/data.js"


import { homePage } from './views/home.js';
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { allArticlesPage } from "./views/all-articles.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { searchPage } from "./views/search.js";

// import * as api from "./data.js";


let main = document.getElementById("main-content")

page("/", middleware, homePage);
// page("/home", middleware, homePage);
page("/details/:id", middleware, detailsPage);
page("/create", middleware, createPage);
page("/edit/:id", middleware, editPage);
page("/register", middleware, registerPage)
page("/login", middleware, loginPage);
page("/all-articles", middleware, allArticlesPage);
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
    let email = sessionStorage.getItem("email")
    
    if (email != null) {
        document.getElementById("user").style.display = "block"
        document.getElementById("guest").style.display = "none"
    } else {
        document.getElementById("user").style.display = "none"
        document.getElementById("guest").style.display = "block"
    }
}

async function logoutFunc() {
    await logout();
    setUserNav();
    page.redirect("/")
}