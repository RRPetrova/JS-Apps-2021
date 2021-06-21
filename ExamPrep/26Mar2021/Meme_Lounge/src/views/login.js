import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/data.js"
import { notify } from "../notification.js"

function loginHtmlTempl(loginFunc) {
    return html`
    <section id="login">
        <form @submit=${loginFunc} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>`
}

export async function loginPage(ctx) {
    ctx.render(loginHtmlTempl(loginFunc));

    async function loginFunc(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let email = formData.get("email");
        let password = formData.get("password");
        try {
            if (email == "" || password == "") {
                throw new Error("Please fill all fields");
            }
            await login(email, password);
            ctx.setUserNav();
            ctx.page.redirect("/allMemes");
        } catch (error) {
            notify(error.message)
        }

    }
}