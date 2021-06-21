function solution() {
    getStudents();
    document.getElementById("submit2").addEventListener("click", createSt);
}
solution();

async function createSt(ev) {
    ev.preventDefault();
    let divCh = Array.from(document.querySelector('.inputs').children);
    let fName = divCh[0].value;
    let lName = divCh[1].value;
    let facNum = divCh[2].value;
    let grade = divCh[3].value;

    if (fName == "" || lName == "" || facNum == "" || grade == "") {
        return alert("All fields are mandatory!!");
    }

    if (!/^\d+$/.test(facNum)) {
        return alert("Faculty number must contains only numbers!!")
    }
   
    if (!/^[0-9](\.[0-9]+)?$/.test(grade)) {
        return alert("Invalid grade!!")
    }

    divCh[0].value = "";
    divCh[1].value = "";
    divCh[2].value = "";
    divCh[3].value = "";
    await fetch("http://localhost:3030/jsonstore/collections/students", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName: fName,
            lastName: lName,
            facultyNumber: facNum,
            grade: grade
        })
    });
   getStudents();
}


async function getStudents() {
    let resp = await fetch("http://localhost:3030/jsonstore/collections/students");
    let data = await resp.json();
    document.querySelector("tbody").innerHTML = "";
    Object.values(data).forEach(e => {
        let tr = document.createElement("tr");
        tr.appendChild(el("td", e.firstName));
        tr.appendChild(el("td", e.lastName));
        tr.appendChild(el("td", e.facultyNumber));
        tr.appendChild(el("td", e.grade));
        document.querySelector("tbody").appendChild(tr);
    });
}

function el(type, text) {
    let res = document.createElement(type);
    res.textContent = text;
    return res;
}