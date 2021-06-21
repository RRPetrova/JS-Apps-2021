import { html } from "../../node_modules/lit-html/lit-html.js"

import { register } from "../api/data.js"
import { notify } from "../notification.js"

function registerHtmlTempl(regFunc) {
    return html`
    <!-- Register Page ( Only for guest users ) -->
    <section id="register">
        <form @submit=${regFunc} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`

}

export async function registerPage(ctx) {
    ctx.render(registerHtmlTempl(regFunc))

    async function regFunc(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let username = formData.get("username");
        let email = formData.get("email");
        let password = formData.get("password");
        let repass = formData.get("repeatPass");
        let gender = formData.get("gender");
        try {
            if (username == "" || email == "" || password == "" || repass == "" || !gender) {
                // ctx.render(regTemplate(regFunc));
                throw new Error("Please fill all fields");
            }
            if (password != repass) {
                throw new Error("Passwords don\'t match");
                // ctx.render(regTemplate(regFunc));
            }
            await register(username, email, password, gender)
            //   formData.reset()
            ctx.setUserNav();
            ctx.page.redirect("/allMemes")
        } catch (error) {
            notify(error.message)
        }


    }

}