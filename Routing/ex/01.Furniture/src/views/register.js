import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js"


function regTemplate(regFunc, invalidEmail, invalidPass, invalidRepass) {
    return html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${regFunc}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (invalidEmail ? " is-invalid" : "" )} id="email" type="text"
                    name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (invalidPass ? " is-invalid" : "" )} id="password" type="password"
                    name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${"form-control" + (invalidRepass ? " is-invalid" : "" )} id="rePass" type="password"
                    name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`
}

export async function registerPage(ctx) {
    ctx.render(regTemplate(regFunc))

    async function regFunc(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let email = formData.get("email");
        let password = formData.get("password");
        let repass = formData.get("rePass");

        if (email == "" || password == "" || repass == "") {
            ctx.render(regTemplate(regFunc, email == "" , password == "" , repass == ""));
            return alert("Please fill all fields");
        }
        if (password != repass) {
            ctx.render(regTemplate(regFunc, false , true ,true));
           return alert("Passwords don't match");
        }

        await register(email, password)
       
    

        ctx.setUserNav();
        ctx.page.redirect("/")

    }
}