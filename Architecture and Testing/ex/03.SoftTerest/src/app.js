import { setupHome } from "./home.js";
import { setupLogin } from "./login.js";
import { setupRegister } from "./register.js";
import { setupDetails } from "./details.js";
import { setupDashboard } from "./dashboard.js";
import { setupCreate } from "./create.js";

let main = document.querySelector("main");
let navBar = document.querySelector("nav")

let views = {};
let btns = {};

let navig = {
    goTo,
    changeButtonsView
};

regView("home", document.getElementById("homeP"), setupHome, "homeBtn");
regView("register", document.getElementById("reg"), setupRegister, "regBtn");
regView("login", document.getElementById("loadP"), setupLogin, "loginBtn");
regView("dashboard", document.getElementById("dashboard-holder"), setupDashboard, "dashboardBtn");
regView("details", document.getElementById("details"), setupDetails); //nqma link
regView("create", document.getElementById("createP"), setupCreate, "createBtn");
document.getElementById("globalLink").remove();

setupNavig();
goTo("home");

function regView(name, section,
    setupFunc, btnName) {
    let view = setupFunc(section, navig);
    views[name] = view;
    if (btnName) {
        btns[btnName] = name;
    }
}

async function goTo(name, ...params) {
    main.innerHTML = "";
    let view = views[name];
    console.log(...params);
    let section = await view(...params);
    main.appendChild(section);
}

function setupNavig() {
    changeButtonsView();
    navBar.addEventListener("click", btnClicked);
}

function btnClicked(ev) {
    let btn = btns[ev.target.id]
    if (btn) {
        ev.preventDefault();
        goTo(btn)
    }
}

function changeButtonsView() {
    let token = sessionStorage.getItem("authToken");
    if (token != null) {
        console.log("not null token");
        Array.from(navBar.querySelectorAll(".userView a")).forEach(btn => btn.style.dispay = "list-item");
        Array.from(navBar.querySelectorAll(".guestView a")).forEach(btn => btn.style.dispay = "none");
    } else {
        //[...navBar.querySelectorAll(".userView")].forEach(b => b.style.display = "none");
        Array.from(navBar.querySelectorAll(".userView")).forEach(b => b.style.display = "none");
        //[...navBar.querySelectorAll(".guestView")].forEach(btn => btn.style.dispay = "list-item");
        Array.from(navBar.querySelectorAll(".guestView")).forEach(btn => btn.style.dispay = "list-item");
    }
}