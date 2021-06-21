import { html } from "../../node_modules/lit-html/lit-html.js"

import { editCar, getCarDetails } from "../api/data.js"


function editTempl(editFunc, currCar) {
    return html`
    <section id="edit-listing">
        <div class="container">
    
            <form @submit=${editFunc} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value=${currCar.brand}>
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value=${currCar.model}>
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${currCar.description}>
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${currCar.year}>
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${currCar.imageUrl}>
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${currCar.price}>
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>`
}

export async function editPage(ctx) {
    console.log(ctx);
    let currId = ctx.params.id;
    let currCar = await getCarDetails(currId);
    console.log(currCar);

    ctx.render(editTempl(editFunc, currCar))

    async function editFunc(ev) {
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

        await editCar(currCar._id, data);
        ctx.page.redirect(`/details/${currCar._id}`)
    }
}