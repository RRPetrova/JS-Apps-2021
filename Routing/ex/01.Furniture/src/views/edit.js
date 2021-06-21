import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getFurnitureId, editFurniture } from "../api/data.js"

function editTeml(item, editFunc) {
    console.log("ed");
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${editFunc}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" .value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" .value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" .value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description"
                    .value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" .value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" .value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`
}


export async function editPage(ctx) {
    let id = ctx.params.id;
    console.log(id);
    let item = await getFurnitureId(id);
    console.log(item);

    ctx.render(editTeml(item, editFunc));

    async function editFunc(ev) {
        ev.preventDefault();
        console.log("func");
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
            return alert("Year must be between 1950 and 2050");
        }
        if (price < 0) {
            return alert("Price must be a positive number");
        }
        if (img == "") {
            return alert("Image URL is required")
        }
        if (description.length < 10) {
            return alert("Description must be more than 10 symbols")
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
        console.log(item._id);
        await editFurniture(item._id, data)
        ctx.page.redirect("/")
    }
}