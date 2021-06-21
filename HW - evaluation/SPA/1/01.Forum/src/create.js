import {showDetails} from "./home.js"
const formData = new FormData(document.querySelector('form'));
const post = {
    title: formData.get('title'),
    description: formData.get('description'),
    img: formData.get('imageUrl')
}

if (Object.values(post).some(x => x == '')) {
    alert('All fields are required!');
}
someF();

async function someF() {
    const responce = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    if (responce.ok) {
        const movie = await responce.json();
        showDetails(movie._id);
    } else {
        const error = await responce.json();
        alert(error.message);
    }
}