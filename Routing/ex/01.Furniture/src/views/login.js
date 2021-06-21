import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

function loginTempl(loginFunc) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${loginFunc}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>`
}

export async function loginPage(ctx) {
   console.log("login P");
    ctx.render(loginTempl(loginFunc));

    async function loginFunc(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get("email")
        let pass = formData.get("password")
        await login(email, pass);
        ctx.setUserNav()
        ctx.page.redirect("/")
    }
}