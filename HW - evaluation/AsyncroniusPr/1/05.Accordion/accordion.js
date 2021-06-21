function solution() {
    getList();
}

solution();


async function getList(){
    let url='http://localhost:3030/jsonstore/advanced/articles/list';
    let response=await fetch(url);
    let data=await response.json();
   

    let urlDetails='http://localhost:3030/jsonstore/advanced/articles/details';
    let responses=await fetch(urlDetails);
    let datas=await responses.json();


    for(let i=0;i<data.length;i++){
        createElements(data[i],datas);
    }

    document.getElementById('main').addEventListener('click',showEvent);
}

function createElements(data,datas){
    const main=document.getElementById('main');

    const divAccord=document.createElement('div');
    divAccord.className='accordion';

    const divHead=document.createElement('div');
    divHead.className='head';

    const span=document.createElement('span');
    span.textContent=data.title;

    const button=document.createElement('button');
    button.className='button';
    
    button.id=`${data._id}`;
    button.textContent='More';

    divHead.appendChild(span);
    divHead.appendChild(button);
    divAccord.appendChild(divHead);

    const divExtra=document.createElement('div');
    divExtra.className='extra';
    divExtra.style='display: none';

    const info=Object.values(datas).find(e=>e._id==data._id);
    const p=document.createElement('p');
    p.textContent=info.content;

    divExtra.appendChild(p);

    divAccord.appendChild(divExtra);
    main.appendChild(divAccord);

}


function showEvent(e){
    const profile = e.target.parentNode;
    console.log(profile);
    let button = profile.querySelector('.button');

    let information = profile.parentNode;
    let extra=information.querySelectorAll('div>div')[1];
    let p=extra.querySelector('p');
    console.log(p);
    extra.style.display = extra.style.display === 'none' || extra.style.display === '' ? 'block' : 'none';
    button.textContent = button.textContent === 'More' ? 'Less' : 'More';

}