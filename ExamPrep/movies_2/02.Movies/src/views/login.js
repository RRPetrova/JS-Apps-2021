import { html } from "../../node_modules/lit-html/lit-html.js"

import { login } from "../api/data.js"

function loginTempl(loginFunc) {
    return html`
<section id="form-login">
    <form @submit=${loginFunc} class="text-center border border-light p-5" action="" method="">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</section>`
}

export async function loginPage(ctx) {
    ctx.render(loginTempl(loginFunc));

    async function loginFunc(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let email = formData.get("email");
        let password = formData.get("password");
        if (email == "" || password == "") {
            return alert("Please fill all fields");
        }
        await login(email, password);
        ctx.setUserNav();
        ctx.page.redirect("/");
        ev.target.reset()
    }
}