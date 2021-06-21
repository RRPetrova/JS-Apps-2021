import {html, render} from '../node_modules/lit-html/lit-html.js';

const btnLoad = document.querySelector('#btnLoadTowns');
const inputs = document.querySelector('#towns');
const divRoot = document.getElementById('root');
const ulEl = document.createElement('ul');

divRoot.appendChild(ulEl);

btnLoad.addEventListener('click', getTowns);

function getTowns(event){

    event.preventDefault();
    const arrTowns = inputs.value.split(', ');

    const townsLi = arrTowns.map(template);
    render(townsLi,ulEl);
    
    
    inputs.value = '';
}

const template = (data) => html`
<li>${data}</li>
`;