import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js"
import {logout } from "./api/data.js"

import { createPage } from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { myFurniturePage } from "./views/myFurniture.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

// import * as api from "./data.js";


let main = document.querySelector(".container")

page("/", middleware, dashboardPage);
page("/dashboard", middleware, dashboardPage);
page("/details/:id", middleware, detailsPage);
page("/create", middleware, createPage);
page("/edit/:id", middleware, editPage);
page("/register", middleware, registerPage)
page("/login", middleware, loginPage);
page("/my-furniture", middleware, myFurniturePage);


document.getElementById("logoutBtn").addEventListener("click", logoutFunc);
setUserNav();

page.start();

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let userId = sessionStorage.getItem("userId")
    if (userId != null) {
        document.getElementById("user").style.display = "inline-block"
        document.getElementById("guest").style.display = "none"
    } else {
        document.getElementById("user").style.display = "none"
        document.getElementById("guest").style.display = "inline-block"
    }
}

async function logoutFunc(){
    await logout();
    setUserNav();
    page.redirect("/")
}