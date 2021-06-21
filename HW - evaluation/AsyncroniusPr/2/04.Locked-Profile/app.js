const mainPage = document.getElementById('main')

async function lockedProfile() {
    const users = await getUsers();

    Object.values(users).forEach((u, index) => {
        mainPage.appendChild(e('div', { 'className': 'profile' },
            e('img', { 'src': './iconProfile2.png', 'className': 'userIcon' }),
            e('label', '', 'Lock'),
            e('input', { 'type': 'radio', 'name': `user${index + 2}Locked`, 'value': 'lock', 'checked': true }),
            e('label', '', 'Unlock'),
            e('input', { 'type': 'radio', 'name': `user${index + 2}Locked`, 'value': 'unlock' }),
            e('br'),
            e('hr'),
            e('label', '', 'Username'),
            e('input', { 'type': 'text', 'name': `user${index + 2}Username`, 'value': u.username, 'disabled': true, 'readonly': true }),
            e('div', { 'id': `user${index + 2}HiddenFields`, 'style': 'display: none;' },
                e('hr'),
                e('label', '', 'Email:'),
                e('input', { 'type': 'email', 'name': `user${index + 2}Email`, 'value': u.email, 'disabled': true, 'readonly': true }),
                e('label', '', 'Age:'),
                e('input', { 'type': 'email', 'name': `user${index + 2}Age`, 'value': u.age, 'disabled': true, 'readonly': true })
            ),
            e('button', { 'onClick': hideOrRevealUserInfo}, 'Show more')
        ))
    })
}

function hideOrRevealUserInfo(ev) {
    const profile = ev.target.parentNode;
    const isLocked = profile
        .querySelector('input[type=radio]:checked').value === 'lock';

    if (isLocked) {
        return;
    }

    let div = profile.querySelector('div');
    let isVisible = div.style.display === 'block';
    div.style.display = isVisible ? 'none' : 'block';
    ev.target.textContent = isVisible ? 'Show more' : 'Hide it';

};

async function getUsers() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const usersPromise = await fetch(url);
    const users = await usersPromise.json();

    return users;
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}