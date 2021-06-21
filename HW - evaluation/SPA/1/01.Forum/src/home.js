async function getPosts() {
    const responce = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'get'
    });
    const data = await responce.json();

    return data;
}

let main;
let section;

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showHome() {
    main.innerHTML = '';
    main.appendChild(section);

    const posts = await getPosts();
    const cards = posts.map(createPostPrewiel);

    const fragment = document.createDocumentFragment();
    cards.forEach(c => fragment.appendChild(c));

    container.innerHTML = '';
    container.appendChild(fragment);
}

function createPostPrewiel(topicName, username) {
    return `<div class="topic-container">
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal">
                <h2>${topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${username}</span></p>
                    </div>
                </div>
                <div class="subscribers">
                    <button class="subscribe">Subscribe</button> 
                    <p>Subscribers: <span>1</span></p>
                </div>
            </div>
        </div>
    </div>
</div>`
}