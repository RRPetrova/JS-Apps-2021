function solve() {

    const depBtn = document.getElementById('depart');
    const arrBtn = document.getElementById('arrive');
    const banner = document.querySelector('div span');

    let busStop = {
        next: 'depot',
        name:''
    };

    async function depart() {
        
        const url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`;
        const responce = await fetch(url);
        const data = await responce.json();

        busStop = data;
        
        banner.textContent = `Next stop ${busStop.name}`;

        depBtn.disabled = true;
        arrBtn.disabled = false;
        
        
    }

    function arrive() {
        banner.textContent = `Arriving at ${busStop.name}`;

        depBtn.disabled = false;
        arrBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();