async function lockedProfile() {

    const main = document.getElementById('main');
    
    //remove the main profile from page
    main.children[0].remove();

    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const result = await fetch(url);
    const data = await result.json();

    Object.entries(data).map(createProfile).forEach(x => main.appendChild(x));


}

function createProfile(pr) {
    let result = e('div', { className: 'profile' },
        e('img', { src: './iconProfile2.png', className: 'userIcon' },),
        e('label', undefined, 'Lock'),
        e('input', { type: 'radio', name: `${pr[1]._id}Locked`, value: 'lock', checked: 'checked' },),
        e('label', undefined, 'Unlock'),
        e('input', { type: 'radio', name: `${pr[1]._id}Locked`, value: 'unlock' },),
        e('br', undefined,),
        e('hr', undefined,),
        e('label', undefined, 'Username'),
        e('input', { type: 'text', name: `${pr[1]._id}Username`, value: pr[1].username, disabled: 'true', readonly: 'true' }),
        e('div', { id: 'user1HiddenFields' },
            e('hr', undefined,),
            e('label', undefined, 'Email:'),
            e('input', { type: 'email', name: `${pr[1]._id}Email`, value: pr[1].email, disabled: '', readonly: '' }),
            e('label', undefined, 'Age:'),
            e('input', { type: 'email', name: `${pr[1]._id}Age`, value: pr[1].age, disabled: '', readonly: '' }),

        ),
        e('button', { onclick: showHideProfile }, 'Show more')
    );
    return result;
}


function showHideProfile(ev) {

    if (ev.target.tagName === 'BUTTON') {
        const profile = ev.target.parentNode;
        const isLocked = profile.querySelector('input[type=radio]:checked').value === 'lock';

        if (isLocked) {
            return;
        }

        let div = profile.querySelector('div');
        let isVisible = div.style.display === 'block';

        div.style.display = isVisible ? 'none' : 'block';
        ev.target.textContent = !isVisible ? "Hide it" : 'Show more'
    }


}

//functon for creating elements
function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

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