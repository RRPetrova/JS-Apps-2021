window.onload = solution();
function solution() {

    receiveData();
}

async function receiveData() {
    let info = await data();



    let main = document.getElementById("main");

    info.forEach(art => {
        let crdiv = e("div")
        crdiv.className = "accordion";

        let divHead = e("div");
        divHead.className = "head";
        let sp = e("span", art.title);
        let btn = e("button", "More");
        btn.className = "button";
        btn.id = art._id;
        btn.addEventListener("click", moreLessFunc);
        divHead.appendChild(sp)
        divHead.appendChild(btn)




        crdiv.appendChild(divHead);
        let divExtra = e("div");
        divExtra.className = "extra";
        let crP = e("p");
        divExtra.appendChild(crP);
        crdiv.appendChild(divExtra);
        main.appendChild(crdiv)


    })

    async function moreLessFunc(ev) {
        let hidData = await dataHidden(ev.target.id);
        console.log(hidData);

        let divExtra = Array.from(ev.target.parentNode.parentNode.querySelectorAll("div"));
        if(ev.target.textContent == "More") {
            ev.target.parentNode.parentNode.querySelector("div p").textContent = hidData.content;
        }

        console.log(ev.target.parentNode.parentNode.querySelector("div p").textContent);
        if (divExtra[1].style.display === "none" || divExtra[1].style.display === "") {
            // console.log(hidData.content);
            //  console.log( ev.target.parentNode.parentNode.querySelector("div p").textContent);
            divExtra[1].style.display = "block";
        } else {
            divExtra[1].style.display = "none";
        }
        ev.target.textContent = ev.target.textContent == "More" ? "Less" : "More";
        //console.log(divExtra.style.display);

    }

}

async function data() {
    let url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    let resp = await fetch(url);
    return await resp.json();
}

async function dataHidden(num) {
    let url = `http://localhost:3030/jsonstore/advanced/articles/details/` + num;
    let resp = await fetch(url);
    return await resp.json();
}



function e(type, content) {
    let res = document.createElement(type);
    res.textContent = content;
    return res;
}