import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFurnitureById, editFurniture } from '../api/data.js';


const editTemplate = (item, onSubmit, errorMsg, invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImg) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (invalidMake !=undefined ? " is-invalid" : "")} id="new-make" type="text" name="make" .value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (invalidModel !=undefined ? " is-invalid" : "")} id="new-model" type="text" name="model" .value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${" form-control" + (invalidYear !=undefined ? " is-invalid" : "")} id="new-year" type="number" name="year" .value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (invalidDescription !=undefined ? " is-invalid" : "")} id="new-description" type="text" name="description" .value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (invalidPrice !=undefined ? " is-invalid" : "")} id="new-price" type="number" name="price" .value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (invalidImg !=undefined ? " is-invalid" : "")} id="new-image" type="text" name="img" .value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
            </div>
            ${errorMsg ? html`<div class="form-group errorMsg">
                <p>${errorMsg}</p>
            </div>` : ''}
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const item = await getFurnitureById(id);

    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const data = Array.from(formData.entries()).reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {})

        if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == '')) {
            return ctx.render(editTemplate(item, onSubmit, 'Please fill all mandatory fields!'));
        }
        data.year = Number(data.year);
        data.price = Number(data.price);
        await editFurniture(item._id, data);

        ctx.page.redirect('/');
    }
}