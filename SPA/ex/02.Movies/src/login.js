import { showHome } from "./home.js"
let main;
let section;

export function setupLogin(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector("form");
    form.addEventListener("submit", loginFunc);

}

async function loginFunc(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    let mail = formData.get("email");
    let pass = formData.get("password");

    const resp = await fetch("http://localhost:3030/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password: pass })
    });

    let data = await resp.json();
    console.log(data);
    console.log(resp);
    if (resp.ok == false) {
        return alert(data.message);
    } else {
        sessionStorage.setItem("authToken", data.accessToken);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("userID", data._id);
        document.getElementById("welcomeMsg").textContent = `Welcome, ${sessionStorage.getItem("email")}`
        Array.from(document.querySelectorAll("nav .user")).forEach(v =>
            v.style.display = "block"
        )
        Array.from(document.querySelectorAll("nav .guest")).forEach(v =>
            v.style.display = "none"
        )
        showHome();
    }
}

export async function showLogin() {
    main.innerHTML = "";
    main.appendChild(section);
}