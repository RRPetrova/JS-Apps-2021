import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api.js";


function regHtmlTempl(registerFunc ,err) {
    return html`<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${registerFunc} id="register-form" class="main-form pad-large">
            ${err ? html` <div class="error">${err.message}</div>` : ""}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`
}



export async function registerPage(ctx) {
    ctx.render(regHtmlTempl(registerFunc))

    async function registerFunc(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let email = formData.get("email")
        let username = formData.get("username")
        let pass = formData.get("password")
        let repass = formData.get("repass")

        try {
            if (email == "" || pass == "" || repass == "" || username == "") {
                throw new Error ("Please fill all fields");
            }

            if (username.length < 3) {
                return alert("Username must be at least 3 characters")
            }

            if (pass != repass) {
                throw new Error ("Passwords don't match");
            }
            if (pass.length < 3) {
                throw new Error ("Password must be at least 3 characters")
            }

            await register(email, username, pass);

            ctx.setUserNav()
            ctx.page.redirect("/")
        } catch (error) {
            ctx.render(regHtmlTempl(registerFunc, error))
        }
    }
}
