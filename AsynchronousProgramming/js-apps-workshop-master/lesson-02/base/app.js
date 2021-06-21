async function getRecipies() {
    let url = `http://localhost:3030/jsonstore/cookbook/recipes`;
    let main = document.querySelector("main");

    try {
        const resp = await fetch(url);
        if (resp.ok == false) {
            throw new Error(resp.statusText);
        }

        const recipes = await resp.json();
        main.innerHTML = "";

        Object.values(recipes).forEach(r => {
            console.log(r);
            let crArt = document.createElement("article");
            crArt.className = "preview";
            crArt.addEventListener("click", () => clickRecipe(r._id, crArt));
            let crDiv1 = document.createElement("div");
            crDiv1.className = "title";
            let crH2 = document.createElement("h2");
            crH2.textContent = r.name;
            crDiv1.appendChild(crH2);
            let crDiv2 = document.createElement("div");
            crDiv2.className = "small";
            let crImg = document.createElement("img");
            crImg.src = r.img;
            crDiv2.appendChild(crImg);
            crArt.appendChild(crDiv1);
            crArt.appendChild(crDiv2);
            main.appendChild(crArt);
        })

    } catch (error) {
        alert(error.message);
    }
}

async function clickRecipe(idR, elem) {
    let url2 = `http://localhost:3030/jsonstore/cookbook/details/` + idR;
    let resp2 = await fetch(url2);
    let data = await resp2.json();
    console.log(data);
    let main = document.querySelector("main");

    let crArt = document.createElement("article");

    let crH2 = document.createElement("h2");
    crH2.textContent = data.name;
    crArt.appendChild(crH2);

    let crDiv1 = document.createElement("div");
    crDiv1.className = "band";
    let crDiv11 = document.createElement("div");
    crDiv11.className = "thumb";
    let crImg = document.createElement("img");
    crImg.src = data.img;
    crDiv11.appendChild(crImg);
    crDiv1.appendChild(crDiv11)

    let crDiv2 = document.createElement("div");
    crDiv2.className = "ingredients";
    let crH3 = document.createElement("h3");
    crH3.textContent = "Ingredients:";
    crDiv2.appendChild(crH3);

    let ul = document.createElement("ul");
    data.ingredients.forEach(i => {
        let crLi = document.createElement("ul");
        crLi.textContent = i;
        ul.appendChild(crLi);
    })

    crDiv2.appendChild(ul);
    crDiv1.appendChild(crDiv2);

    let div3 = document.createElement("div");
    div3.className = "description";
    let h32 = document.createElement("h3");
    h32.textContent = "Preparation:";
    
    data.steps.forEach(s=> {
        let p = document.createElement("p");
        p.textContent = s;
        div3.appendChild(p);
    }) 
    crArt.appendChild(crDiv1);
    crArt.appendChild(div3);
    elem.parentNode.replaceChild(crArt, elem);
   
}

window.addEventListener("load", () => {
    getRecipies();
})
