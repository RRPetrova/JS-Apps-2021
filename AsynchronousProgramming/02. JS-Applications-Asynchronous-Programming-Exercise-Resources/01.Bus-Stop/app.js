async function getInfo() {
    let field = document.getElementById("stopId");
    let id = field.value;

    const url = `http://localhost:3030/jsonstore/bus/businfo/` + id;

    try {
        const resp = await fetch(url);
        const data = await resp.json();

        document.getElementById("stopName").textContent = data.name;
        let ul = document.getElementById("buses");
        ul.innerHTML = "";
        field.value = "";
        Object.entries(data.buses).forEach(b => {
            let crLi = document.createElement("li");
            crLi.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            ul.appendChild(crLi);
        });
        
    } catch (error) {
        document.getElementById("buses").innerHTML = "";
        document.getElementById("stopName").textContent = "Error";
    }
}