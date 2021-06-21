import { showHome } from "./home.js"
let main;
let section;

export function signUpSetup(mainTarget, sectionTarget){
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector("form");
    form.addEventListener("submit", regFunc);
}

export async function showSignUp(){
    main.innerHTML = "";
    main.appendChild(section);
}


async function regFunc(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    let mail = formData.get("email");
    let pass = formData.get("password");
    let repass = formData.get("repeatPassword");

    if (mail == "" || pass == "") {
        return alert("All fields are mandatory!")
    } else if (pass !== repass) {
        return alert("Passwords don\'t match!")
    }

    const resp = await fetch("http://localhost:3030/users/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password: pass })
    });

    let data = await resp.json();
  
    console.log(data);
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
