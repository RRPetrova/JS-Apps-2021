async function solution() {

    const main = document.getElementById('main')

    const request = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const data = await request.json()

    Object.entries(data).map(createArticle).forEach(a => main.appendChild(a))

}

solution();

function createArticle(art) {
    let result =
        e('div', { className: 'accordion' },
            e('div', { className: 'head' },
                e('span', undefined, art[1].title),
                e('button', { className: 'button', id: art[1]._id, onclick: showArticle }, 'More')
            ),
            e('div', { className: 'extra' },
                e('p', undefined, ''),

            ),
        );

    return result;
}

async function showArticle(ev) {
    const btnTitle = ev.target.textContent;
    const hiddenField = ev.target.parentNode.parentNode.children[1]
    const artId = ev.target.id;

    ev.target.textContent = (btnTitle == 'More') ? "Less" : 'More';
    
    if(hiddenField.textContent == ''){
        const responce = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + artId)
        const data = await responce.json();
        
        hiddenField.textContent = data.content;
    }
    
    hiddenField.style.display = (hiddenField.style.display == '') ? 'block' : '';
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