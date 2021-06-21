import { showDetails } from './details.js';

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    }

    if (Object.values(movie).some(x => x == '')) {
        return alert('All fields are required!');
    }

    const responce = await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(movie)
    });

    if(responce.ok) {
        const movie = await responce.json();
        showDetails(movie._id);
    } else {
        const error = await responce.json();
        alert(error.message);
    }
}

let main;
let section;

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);
}