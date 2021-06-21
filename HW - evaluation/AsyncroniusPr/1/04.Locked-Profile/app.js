let count = 3;
function lockedProfile() {

    getProfiles();

}

async function getProfiles() {

    let url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(e => makeCards(e));
    document.getElementById('main').addEventListener('click', showEffects);

}


function makeCards(data) {

    const main = document.getElementById('main');
    const br = document.createElement('br');
    const hr = document.createElement('hr');

    const div = document.createElement('div');
    div.value = `${data._id}`;
    div.className = 'profile';

    const img = document.createElement('img');
    img.src = "./iconProfile2.png";
    img.className = 'userIcon';
    div.appendChild(img);

    const labelLock = document.createElement('label');
    labelLock.textContent = 'Lock';

    const firstInput = document.createElement('input');
    firstInput.type = 'radio';
    firstInput.name = `user${count}Locked`;
    firstInput.value = `lock`;
    firstInput.checked = true;

    div.appendChild(labelLock);
    div.appendChild(firstInput);

    const labelUnlock = document.createElement('label');
    labelUnlock.textContent = 'Unlock';

    const secondInput = document.createElement('input');
    secondInput.type = 'radio';
    secondInput.name = `user${count}Locked`;
    secondInput.value = `unlock`;

    div.appendChild(labelUnlock);
    div.appendChild(secondInput);

    const labelUsername = document.createElement('label');
    labelUsername.textContent = 'Username';

    const inputUsername = document.createElement('input');
    inputUsername.type = 'text';
    inputUsername.name = `user${count}Username`;
    inputUsername.value = `${data.username}`;
    inputUsername.disabled = true;
    inputUsername.readOnly = true;
    inputUsername.textContent = `${data.username}`;

    const divSpec = document.createElement('div');
    divSpec.id = `user${count}HiddenFields`;
    divSpec.style = 'display: none';

    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'Email:';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = `user${count}Email`;
    inputEmail.value = `${data.email}`;
    inputEmail.disabled = true;
    inputEmail.readOnly = true;
    inputEmail.textContent = `${data.email}`;

    const labelAge = document.createElement('label');
    labelAge.textContent = 'Age:';

    const inputAge = document.createElement('input');
    inputAge.type = 'email';
    inputAge.name = `user${count}Age`;
    inputAge.value = `${data.age}`;
    inputAge.disabled = true;
    inputAge.readOnly = true;
    inputAge.textContent = `${data.age}`;
    const hr1 = document.createElement('hr');

    divSpec.appendChild(hr1);
    divSpec.appendChild(labelEmail);
    divSpec.appendChild(inputEmail);
    divSpec.appendChild(labelAge);
    divSpec.appendChild(inputAge);

    const button = document.createElement('button');
    button.textContent = 'Show more';

    div.appendChild(br);
    div.appendChild(hr);
    div.appendChild(labelUsername);
    div.appendChild(inputUsername);
    div.appendChild(divSpec);
    div.appendChild(button);

    main.appendChild(div);
    count++;

}


function showEffects(e) {

    if (e.target.tagName === 'BUTTON') {
        const profile = e.target.parentNode;
        const isLocked = profile.querySelector('input[type=radio]:checked').value === 'lock';

        if (isLocked) {
            return;
        }

        let div = profile.querySelector('div');
        let isVisible = div.style.display === 'block';
        div.style.display = isVisible ? 'none' : 'block';
        e.target.textContent = !isVisible ? 'Hide it' : 'Show more';

    }
}

