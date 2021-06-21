import { html } from "../../node_modules/lit-html/lit-html.js"

import { register } from "../api/data.js"

function registerHtmlTempl(registerFunc) {
    return html`
<section id="register">
    <div class="container">
        <form @submit=${registerFunc} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`
}


export async function registerPage(ctx) {
    ctx.render(registerHtmlTempl(registerFunc));

    async function registerFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);

        let username = formData.get("username").trim();
        let password = formData.get("password").trim();
        let repass = formData.get("repeatPass").trim();

        if (username == "" || password == "") {
            return alert("Please fill all fields");
        }

        if (password != repass) {
            return alert("Passwords don't match");
        }
        await register(username, password);
        ctx.setUserNav();
        ctx.page.redirect("/allListings");

    }
}