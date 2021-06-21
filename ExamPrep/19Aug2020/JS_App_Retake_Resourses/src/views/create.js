import { html } from "../../node_modules/lit-html/lit-html.js"
import {createOffer} from "../api/data.js";

function createHtmlTempl(createFunc) {
   return html`
<h1>Create New Offer</h1>
<p class="message"></p>
<form @submit=${createFunc}>
   <div>
      <input type="text" placeholder="Name..." name="name">
   </div>
   <div>
      <input type="text" placeholder="Price..." name="price">
   </div>
   <div>
      <input type="text" placeholder="Image url..." name="imageUrl">
   </div>
   <div>
      <textarea placeholder="Give us some description about this offer..." name="description"></textarea>
   </div>
   <div>
      <input type="text" placeholder="Brand..." name="brand">
   </div>
   <div>
      <button>Create</button>
   </div>
</form>`
}

export async function createPage(ctx) {
   ctx.render(createHtmlTempl(createFunc));


   async function createFunc(ev) {
      ev.preventDefault();
   let formData = new FormData(ev.target);
        let name = formData.get("name")
        let price = formData.get("price");
        let imageUrl = formData.get("imageUrl");
        let description = formData.get("description");
        let brand = formData.get("brand");

       
            if (name == "" || description == "" || imageUrl == "") {
                throw new Error ("All fields shoud be filled");
           
            }
            let data = {
               name: name,
               price: Number(price),
                description: description,
                imageUrl: imageUrl,
                brand: brand, 
                owner_id: sessionStorage.getItem("userId")
            }
            await createOffer(data);
            ctx.page.redirect("/homePageLogged");
       
   }
}