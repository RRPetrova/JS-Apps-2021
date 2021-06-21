import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";


import { logout } from "./api/data.js"
import { homeFunc } from "./views/homePage.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { editTeamPage } from "./views/edit.js";
import { myTeams } from "./views/myTeams.js";
import { teamDetailsPage } from "./views/details.js";
import { createTeamPage } from "./views/create.js";
import { browsePage } from "./views/brwose.js";

let main = document.querySelector("body main");
document.getElementById("logoutBtn").addEventListener("click", logoutFunc);

console.log(page);
page("/", middleware, homeFunc);

page("/homePage", middleware, homeFunc);
page("/register", middleware, registerPage)
page("/login", middleware, loginPage)
page("/create", middleware, createTeamPage)
page("/edit/:id", middleware, editTeamPage)
page("/browse", middleware, browsePage)
page("/details/:id", middleware, teamDetailsPage)
setUserNav();
page.start();


function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    console.log("to next");
    next();
}

function setUserNav() {
    let userId = sessionStorage.getItem("userId")
    if (userId != null) {
        Array.from(document.querySelectorAll("nav .guest")).forEach(el => el.style.display = "none")
        Array.from(document.querySelectorAll("nav .user")).forEach(el => el.style.display = "block")
    } else {
        Array.from(document.querySelectorAll("nav .user")).forEach(el => el.style.display = "none")
        Array.from(document.querySelectorAll("nav .guest")).forEach(el => el.style.display = "block")
    }
}

async function logoutFunc() {
    await logout();
    setUserNav();
    page.redirect("/")
}