import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { createFurniture} from "../api/data.js"

function createTemplate(createFunc) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${createFunc}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control valid" id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>`
}


export async function createPage(ctx) {
   
    ctx.render(createTemplate(createFunc));

    async function createFunc(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let make = formData.get("make")
        let model = formData.get("model")
        let year = formData.get("year")
        let description = formData.get("description")
        let price = formData.get("price")
        let img = formData.get("img")
        let material = formData.get("material")

        if (make.length < 4) {
            return alert("Make should be at lest 4 characters");
        }
        if (model.length < 4) {
            return alert("Make should be at lest 4 characters");
        }
        if (year < 1950 || year > 2050) {
            return  alert("Year must be between 1950 and 2050");
        }
        if (price < 0) {
            return   alert("Price must be a positive number");
        }
        if (img == "") {
            return alert("Image URL is required")
        }
        if (description.length < 10) {
            return  alert("Description must be more than 10 symbols")
        }

        let data = {
            make: make,
            model: model,
            year: Number(year),
            description: description,
            price: Number(price),
            img: img,
            material: material
        }
        await createFurniture(data)
        ctx.page.redirect("/")
    }
}