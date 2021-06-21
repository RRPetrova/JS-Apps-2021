function attachEvents() {
    document.getElementById("btnLoad").addEventListener("click", loadPB);
    document.getElementById("btnCreate").addEventListener("click", createEntry);
}

attachEvents();

async function loadPB() {
    let resp = await fetch("http://localhost:3030/jsonstore/phonebook");
    let data = await resp.json();

    let pb = document.getElementById("phonebook");
    pb.innerHTML = "";
    Object.values(data).forEach(e => {
        let li = document.createElement("li");
        let btnDel = document.createElement("button");
        btnDel.addEventListener("click", delFunc);
        btnDel.textContent = "Delete";
        li.textContent = `${e.person}: ${e.phone}`;
        li.id = e._id;
        li.appendChild(btnDel);
        pb.appendChild(li);
    })
}

function delFunc(ev) {
    let liToDel = ev.target.parentNode;
    let tokens = liToDel.textContent.split(":");
    let key = liToDel.id;
    const confirmed = confirm(`Are you sure you want to delete ${tokens[0]} with phone number ${tokens[1].substring(0, tokens[1].length - 6)}`);
    if (confirmed) {
        delContact(key)
    }
}

async function createEntry() {
    let person = document.getElementById("person").value;
    let phone = document.getElementById("phone").value;
    if (person == "" || phone == "") {
        return alert("All fields are mandatory!")
    }
    document.getElementById("person").value = "";
    document.getElementById("phone").value = "";

    let cont = { person: person, phone: phone };
    let resp = await fetch("http://localhost:3030/jsonstore/phonebook", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cont)
    });
    return data = await resp.json();

}

async function delContact(key) {
    await fetch("http://localhost:3030/jsonstore/phonebook/" + key, {
        method: "delete",
    })
    loadPB();
}