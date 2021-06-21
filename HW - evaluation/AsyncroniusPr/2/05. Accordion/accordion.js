async function solution() {

    // attribute input - [class=wtf, id=_id]
    function createElement(type, text, attributes = []){
    let element = document.createElement(type)
    if(text){
            element.textContent = text
    }
    attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
            element.setAttribute(name, value)
    })
    return element
    }

async function getArticleList(){
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`
    let response = await fetch(url)
    let data = await response.json()
    return data

}

let articleList = await getArticleList()
for(let[k, v ] of Object.entries(articleList)){
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${v._id}`
    let response = await fetch (url)
    let data = await response.json()
    let content = data.content
    

    let button = createElement('button', 'More', ['class=button', `id=${v._id}`])   
    let span = createElement('span', v.title)
    let div1 = createElement('div', undefined, ['class=head'])
    div1.appendChild(span)
    div1.appendChild(button)
    
    let p = createElement('p', content)
    let div2 = createElement('div', undefined, ['class=extra'])
    div2.appendChild(p)
    
    let divAcordian = createElement('div', undefined, ['class=accordion'])
    divAcordian.appendChild(div1)
    divAcordian.appendChild(div2)
    
    document.getElementById('main').appendChild(divAcordian)

    
}

window.addEventListener('click', (e) =>{
    if (e.target.classList == 'button'){
        if (e.target.parentNode.parentNode.querySelector('.extra').style.display == 'inline-block'){
            e.target.parentNode.parentNode.querySelector('.extra').style.display = ''
            e.target.parentNode.querySelector('button').textContent = 'More'
        }
        else{
            e.target.parentNode.parentNode.querySelector('.extra').style.display = 'inline-block'
            e.target.parentNode.querySelector('button').textContent = 'Show Less'
        }
    }

})

}