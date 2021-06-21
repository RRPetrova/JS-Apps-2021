function solve() {
    let arrBtn = document.getElementById("arrive");
    let depBtn = document.getElementById("depart");
    let stopName = {
        next: "depot"
    };
    let banner = document.querySelector("#info span");

    async function depart() {
        let url = "http://localhost:3030/jsonstore/bus/schedule/" + stopName.next;
      
        let resp = await fetch(url);
        let data = await resp.json();
        stopName = data;
        banner.textContent = `Next stop ${stopName.name}`
        arrBtn.disabled = false;
        depBtn.disabled = true;
    }

    function arrive() {
        banner.textContent = `Arriving at ${stopName.name}`
        arrBtn.disabled = true;
        depBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();