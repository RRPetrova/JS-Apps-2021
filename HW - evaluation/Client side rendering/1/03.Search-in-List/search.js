import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const generealTemplate = (towns,match) => html`
<article>
   <div id="towns">
      <ul>${towns.map(c=>townsTemplate(c,match))}
      </ul>
   </div>
   <input type="text" id="searchText" .value=${match}>
   <button @click=${active}>Search</button>
   <div id="result">${count(towns,match)}</div>
</article>`;
const townsTemplate = (city,match)=>html`
   <li class=${(match && city.toLowerCase().includes(match.toLowerCase())? 'active' : '')}>${city}</li>`;
const container= document.body;
update();
function update (match=''){
   const result=generealTemplate(towns,match);
   render(result,container)
}

function active(ev) {
   const match = ev.target.parentNode.querySelector('input').value;
   update(match);
}
function count(towns,match){
   const num= towns.filter(t=>match && t.toLowerCase().includes(match.toLowerCase())).length
   if(num){
      return `${num} matches found`
   }
   return ''
}