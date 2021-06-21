document.querySelector("form").addEventListener("submit", createRec);

async function createRec(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target)

    let name = formData.get("name");
    let img = formData.get("img");
    let ingred = formData.get("ingredients")
        .split("\n")
        .map(r => r.trim())
        .filter(r => r != "");
    let steps = formData.get("steps")
        .split("\n")
        .map(r => r.trim())
        .filter(r => r != "");
    console.log(name, img, ingred, steps);

    const token = sessionStorage.getItem("userToken");
    console.log("from create:" + token);

    let resp = await fetch("http://localhost:3030/data/recipes", {
        method: "post",
        headers: {
            "Content-type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({
            name: name,
            img: img,
            ingredients: ingred,
            steps: steps
        })
    });

    let data = await resp.json();

    if (resp.ok == false) {
        return alert(data.message);
    }
    window.location.pathname = '/RemoteDataAndAuthentication/lab/index.html';
}