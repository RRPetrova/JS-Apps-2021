import { html } from "../../node_modules/lit-html/lit-html.js"
import {login } from "../api/data.js"

function loginHtmlTempl(loginFunc) {
    return html`
    <h1>Login</h1>
    <p class="form-info">Don't have account?
        <a href="/register">Register now</a> and fix that!
    </p>
    <form action="">
        <div>
            <input id="mail" type="email" name="email" placeholder="Email...">
        </div>
    
        <div>
            <input id="pass" type="password" name="password" placeholder="Password...">
        </div>
        <div>
            <button @click=${loginFunc} id="btnLogin">Login</button>
        </div>
    </form>`;
}

export async function loginPage(ctx) {
    ctx.render(loginHtmlTempl(loginFunc))

    async function loginFunc(ev) {
        ev.preventDefault();
        // let formData = new FormData(ev.target);
        // let email = formData.get("email");
        // let password = formData.get("password");
        let email  = document.getElementById("mail").value
        let password  = document.getElementById("pass").value 
        
        console.log(email, password);
        console.log(ctx.page);
        await login(email, password);

        ctx.setUserNav();
       ctx.page.redirect("/homePageLogged")
    }
}