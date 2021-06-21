import { html } from "../../node_modules/lit-html/lit-html.js"

import { register } from "../api/data.js"

function registerTempl(regFunc) {
    return html`
    <section id="form-sign-up">
        <form @submit=${regFunc} class="text-center border border-light p-5" action="#" method="post">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" placeholder="Email" name="email" value="">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password" name="password" value="">
            </div>
    
            <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
            </div>
    
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </section>`
}

export async function registerPage(ctx) {
    ctx.render(registerTempl(regFunc))

    async function regFunc(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let email = formData.get("email");
        let password = formData.get("password");
        let repass = formData.get("repeatPassword");

        if (email == "" || password == "" || repass == "") {
            return alert("Please fill all fields");
        }
        if ( password.length < 6) {
            return alert("Password must be at least 6 characters");
        }

        if (password != repass) {
            return alert("Passwords don\'t match");
        }
        await register(email, password)

        ctx.setUserNav();
        ctx.page.redirect("/")
    }

}