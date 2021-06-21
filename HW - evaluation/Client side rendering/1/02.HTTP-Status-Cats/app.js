import { render,html } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';
import { cats } from './catSeeder.js'

const container = document.getElementById('allCats');

const catsTemplate = (cats) => html`
<li>
    <img src="./images/${cats.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">${cats.info ? "Hide" : 'Show'} status code</button>
        <div class="status" style=${styleMap(cats.info ? {} : {display:"none"})} id="${cats.id}">
            <h4>Status Code: ${cats.statusCode}</h4>
            <p>${cats.statusMessage}</p>
        </div>
    </div>
</li>`;
cats.map(c=>c.info=false);

update();


function update(){
    const result = html`<ul @click=${toggle}>${cats.map(catsTemplate)}</ul>`;
    render(result,container);
}

function toggle(ev){
    console.log(ev.target)
    if(ev.target.classList.contains('showBtn')){
        const elementId=ev.target.parentNode.querySelector('.status').id;
        const currCat = cats.find(c=>c.id==elementId);
        currCat.info=!currCat.info;
        update();
    }
}