import { html } from "../../node_modules/lit-html/lit-html.js"
import {register } from "../api/data.js"

function registerHtmplTempl(regFunc) {
    return html`
    <h1>Register</h1>
    <p class="form-info">Already registered?
        <a href="/login">Login now</a> and have some fun!
    </p>
    
    <form @submit=${regFunc} action="">
        <div>
            <input type="email" name="email" placeholder="Email...">
        </div>
        <div>
            <input type="password" name="pass" placeholder="Password">
        </div>
        <div>
            <input type="password" name="repass" placeholder="Re-password">
        </div>
        <div>
            <p class="message"></p>
            <button>Register</button>
        </div>
    </form>`
}


export async function registerPage(ctx) {
    ctx.render(registerHtmplTempl(regFunc))

    async function regFunc(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let email = formData.get("email");
        let password = formData.get("pass");
        let repass = formData.get("repass");

        if (email == "" || password == "" || repass == "") {
            ctx.render(registerHtmplTempl(regFunc));
            return alert("Please fill all fields");
        }
        if(password.length < 6) {
            return alert("The password must be at least 6 characters.")
        }
        if (password != repass) {
            ctx.render(registerHtmplTempl(regFunc));
            return alert("Passwords don't match");
        }

        await register(email, password)
        ctx.setUserNav()
      //  ctx.page.redirect("/homeP")
    }
}