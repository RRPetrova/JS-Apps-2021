import { showDetails } from './details.js';

async function getMovieById(id) {
    const response = await fetch('http://localhost:3030/data/movies/' + id);
    const data = await response.json();

    return data;
}

export async function onSubmit(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    }

    const responce = await fetch('http://localhost:3030/data/movies/' + formData.get('id'), {
        method: 'put',
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

export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export async function showEdit(id) {
    console.log(id);
    main.innerHTML = '';
    main.appendChild(section);

    const movie = await getMovieById(id);
    section.querySelector('[name="id"]').value = id;
    section.querySelector('[name="title"]').value = movie.title;
    section.querySelector('[name="description"]').value = movie.description;
    section.querySelector('[name="imageUrl"]').value = movie.img;
}