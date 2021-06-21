import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const section = document.getElementById('allCats');
const ulEl = document.createElement('ul');

section.appendChild(ulEl);

const catTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${onClick} class="showBtn">Show status code</button>
        <div class="status" style="display: none" id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>
`;

const elements = cats.map(catTemplate);

render(elements,ulEl);

function onClick(event){

    const parent = event.target.parentNode
    const div = parent.querySelector('.status');
    const currStyle = div.style.display;
    console.log(currStyle);

    if(currStyle == 'none'){
        div.style.display = 'block';
    }else{
        div.style.display = 'none';
    }
}