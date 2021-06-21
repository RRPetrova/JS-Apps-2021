import { html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"

import { login } from "../api/data.js"
import { notificationField } from "./notify.js"
import {loadingTempl} from "./loading.js"

function loginTempl(loginFunc) {
    return html`
    <section id="login">
        <div class="container">
            <form @submit=${loginFunc} id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>
    
                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">
    
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>`
}

export async function loginPage(ctx) {
    ctx.render(until(loginTempl(loginFunc), loadingTempl()));

    async function loginFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);

        let username = formData.get("username");
        let password = formData.get("password");
       
            if (username == "" || password == "") {
                return alert("Please fill all fields");
            }
            await login(username, password);
            ctx.setUserNav();
            ctx.page.redirect("/allListings");
       


    }
}