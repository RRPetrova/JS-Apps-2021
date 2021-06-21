import { login } from "./data.js";
//import {} from "./data.js"

export async function setupLogin(section, navig) {
    let form = section.querySelector("form");
    form.addEventListener("submit", logFunc);


    return showLogin;

    async function showLogin() {
        return section;
    }

    async function logFunc(ev) {
        ev.preventDefault();
        let formData = new FormData(form);
    
        let email = formData.get("email");
        let pass = formData.get("password");
        await login(email, pass);
        form.reset()
        navig.goTo("home");
        navig.changeButtonsView();
    }
}



