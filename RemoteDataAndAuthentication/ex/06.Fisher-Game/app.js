function attachEvents() {
    document.querySelector('.load').addEventListener("click", loadCatches);
    const token = sessionStorage.getItem('userToken');
    if (token != undefined) {
        let div = document.getElementById("guest");
        div.querySelector("a").textContent = "Logout";
        document.querySelector('.add').disabled = false;
        document.querySelector('.add').addEventListener("click", createCatch);
    }
}
attachEvents();

async function loadCatches() {
    let resp = await fetch("http://localhost:3030/data/catches")
    let data = await resp.json();
    const token = sessionStorage.getItem('userToken');
    document.getElementById("catches").innerHTML = "";

    data.forEach(en => {
        let vals = Object.values(en);

        let res = `<div class="${en._ownerId}">
        <label>Angler</label>
        <input type="text" class="angler" value="${vals[1]}" />
        <hr>
        <label>Weight</label>
        <input type="number" class="weight" value="${vals[2]}" />
        <hr>
        <label>Species</label>
        <input type="text" class="species" value="${vals[3]}" />
        <hr>
        <label>Location</label>
        <input type="text" class="location" value="${vals[4]}" />
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value="${vals[5]}" />
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${vals[6]}" />
        <hr>
        <button disabled id="${en._id}" class="update">Update</button>
        <button disabled id="${en._id}" class="delete">Delete</button>
    </div>`
        document.getElementById("catches").innerHTML += res;
    });
    data.forEach(e => {
        if (e._ownerId == sessionStorage.getItem("ownId")) {
            let currDiv = Array.from(document.getElementsByClassName(e._ownerId));
            currDiv.forEach(d => {
                d.querySelector(".update").disabled = false;
                d.querySelector(".delete").disabled = false;
            });
        }
    })

    Array.from(document.getElementsByClassName("delete"))
        .forEach(b => {
            b.addEventListener("click", (ev) => {
                const confirmed = confirm("Are you sure u want to delete this entry");
                if (confirmed) {
                    delCatch(ev.target.id);
                }
            })
        });

    Array.from(document.getElementsByClassName("update"))
        .forEach(b => {
            b.addEventListener("click", (ev) => {
                updateCatch(ev.target.id);
            }
            )
        });
}

async function updateCatch(id) {
    let currDiv = document.getElementById(id).parentNode
        .querySelectorAll("input");
    let updCatch = {
        angler: currDiv[0].value,
        weight: currDiv[1].value,
        species: currDiv[2].value,
        location: currDiv[3].value,
        bait: currDiv[4].value,
        captureTime: currDiv[5].value,
    }
    const token = sessionStorage.getItem('userToken');
    await fetch("http://localhost:3030/data/catches/" + id, {
        method: "put",
        headers: {
            "Content-type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify(updCatch)
    })
    loadCatches();
}

async function createCatch() {
    let inputForm = document.getElementById("addForm");
    let arrayOfInputValues = [];
    inputForm.querySelectorAll("input").forEach(i => arrayOfInputValues.push(i.value));

    const token = sessionStorage.getItem('userToken');
    await fetch("http://localhost:3030/data/catches", {
        method: "post",
        headers: {
            "Content-type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({
            angler: arrayOfInputValues[0],
            weight: arrayOfInputValues[1],
            species: arrayOfInputValues[2],
            location: arrayOfInputValues[3],
            bait: arrayOfInputValues[4],
            captureTime: arrayOfInputValues[5]
        })
    });

    let resp2 = await fetch("http://localhost:3030/data/catches")
    let data2 = await resp2.json();
    sessionStorage.setItem("ownId", data2[data2.length - 1]._ownerId);
    inputForm.querySelectorAll("input").forEach(i => {
        i.value = "";
    });
    loadCatches();
}

async function delCatch(id) {
    const token = sessionStorage.getItem('userToken');
    const confirmed = confirm("Are you sure u want to delete this entry");
    if (confirmed) {
        await fetch("http://localhost:3030/data/catches/" + id, {
            method: "delete",
            headers: {
                "Content-type": "application/json",
                "X-Authorization": token
            }
        })
    }
    loadCatches();
}