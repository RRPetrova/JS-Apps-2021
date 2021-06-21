import { render,html } from './node_modules/lit-html/lit-html.js'

const container = document.getElementById('root');
const input = document.getElementById('towns');
const createUl = (data) =>html`<ul>${data}</ul>`;
const createLi = (data) =>html`<li>${data}</li>`;

document.getElementById('btnLoadTowns').addEventListener('click',(ev)=>{
    ev.preventDefault();
    const data=input.value.split(', ');console.log(data)
    if(data[0]==''){
        throw new Error('Please enter a valid city');
    }
    const result=createUl(data.map(createLi));
    render(result,container);
    input.value='';
})
