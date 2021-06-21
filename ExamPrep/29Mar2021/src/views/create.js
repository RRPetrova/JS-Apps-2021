import { html } from "../../node_modules/lit-html/lit-html.js"

import { createCar } from "../api/data.js"

function createCarTemplHtml(createFunc) {
    return html`
    <section id="create-listing">
        <div class="container">
            <form @submit=${createFunc} id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">
    
                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>`
}

export async function createPage(ctx) {
    ctx.render(createCarTemplHtml(createFunc))

    async function createFunc(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let brand = formData.get("brand")
        let model = formData.get("model")
        let description = formData.get("description")
        let year = formData.get("year")
        let imageUrl = formData.get("imageUrl")
        let price = formData.get("price")

        if (brand == "" || model == "" || description == "" || year == ""
            || imageUrl == "" || price == "") {
            return alert("Please fill all fields")
        }

        if (Number(year) <= 0 || isNaN(year)) {
            return alert("Please fill correct year")
        }

        if (Number(price) < 0 || isNaN(price)) {
            return alert("Price must be a positive number!")
        }

        let data = {
            brand: brand,
            model: model,
            description: description,
            year: Number(year),
            imageUrl: imageUrl,
            price: Number(price)
        }

        await createCar(data);
        ctx.page.redirect("/allListings")
    }
}