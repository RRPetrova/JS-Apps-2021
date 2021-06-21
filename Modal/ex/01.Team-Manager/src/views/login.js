import { html} from "../../node_modules/lit-html/lit-html.js"
import {login} from "../api/data.js"

function loginHtmlTempl(loginFunc, err) {
    return html`
    <section id="login">
        <article class="narrow">
            <header class="pad-med">
                <h1>Login</h1>
            </header>
            <form @submit=${loginFunc} id="login-form" class="main-form pad-large">
                ${err ?
                     html`<div class="error">${err.message}</div>` : ""}
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input class="action cta" type="submit" value="Sign In">
            </form>
            <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
            </footer>
        </article>
    </section>`
}

export async function loginPage(ctx) {
    console.log("log");
     ctx.render(loginHtmlTempl(loginFunc));

    async function loginFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let email = formData.get("email")
        let pass = formData.get("password")
        
        try {
            await login(email, pass);
      
            ctx.setUserNav()
            ctx.page.redirect("/")    
        } catch (error) {
            ctx.render(loginHtmlTempl(loginFunc, error));
        }
        
    }
}