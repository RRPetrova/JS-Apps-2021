function attachEvents() {
    document.getElementById("submit").addEventListener("click", subm);
}
attachEvents();

async function subm() {

    let locField = document.getElementById("location");
    let locVal = locField.value;
    let code = await loc(locVal);
    let [curr, next] = await Promise.all([today(code), nextDays(code)]);

    let icons = {
        "Sunny": "☀",
        "Partly sunny": "⛅",
        "Overcast": "☁",
        "Rain": "☂",
        "Degrees": "°"
    }
    document.getElementById("forecast").style.display = "block";

    if (document.querySelector(".forecasts") !== null) {
        document.querySelector(".forecasts").parentNode.removeChild(document.querySelector(".forecasts"));
    }

    if (document.querySelector(".forecast-info") !== null) {
        document.querySelector(".forecast-info").parentNode.removeChild(document.querySelector(".forecast-info"));
    }

    let crDivFc = document.createElement("div");
    crDivFc.className = "forecasts";

    let sp1 = document.createElement("span");
    sp1.className = "condition symbol";
    sp1.textContent = icons[curr.forecast["condition"]];
    let sp2 = document.createElement("span");
    sp2.className = "condition";
    let spTown = document.createElement("span");
    spTown.className = "forecast-data";
    spTown.textContent = curr.name;
    let spDegr = document.createElement("span");
    spDegr.className = "forecast-data";
    spDegr.textContent = `${curr.forecast["low"]}${icons["Degrees"]}/${curr.forecast["high"]}${icons["Degrees"]}`;
    let spCond = document.createElement("span");
    spCond.className = "forecast-data";
    spCond.textContent = curr.condition;

    sp2.appendChild(spTown)
    sp2.appendChild(spDegr)
    sp2.appendChild(spCond)
    crDivFc.appendChild(sp1);
    crDivFc.appendChild(sp2);
    document.getElementById("current").appendChild(crDivFc);

    let crDivFcInfo = document.createElement("div");
    crDivFcInfo.className = "forecast-info";


    console.log(curr);
    console.log(next);

    Object.entries(next.forecast).forEach(d => {
        sp1 = document.createElement("span");
        sp1.className = "upcoming";
        let spD = document.createElement("span");
        spD.className = "symbol";
        spD.textContent = icons[d[1]["condition"]];
        spDegr = document.createElement("span");
        spDegr.className = "forecast-data";
        spDegr.textContent = `${d[1]["low"]}${icons["Degrees"]}/${d[1]["high"]}${icons["Degrees"]}`;
        spCond = document.createElement("span");
        spCond.className = "forecast-data";
        spCond.textContent = d[1]["condition"];
        sp1.appendChild(spD);
        sp1.appendChild(spDegr);
        sp1.appendChild(spCond);
        crDivFcInfo.appendChild(sp1);
    });
    document.getElementById("upcoming").appendChild(crDivFcInfo);
}


async function loc(town) {
    let urlLoc = `http://localhost:3030/jsonstore/forecaster/locations`;
    let res;
    try {
        let respLoc = await fetch(urlLoc);
        let dataLoc = await respLoc.json();
        let filt = dataLoc.filter(v => v.name.toLowerCase() == town.toLowerCase());
        res = filt[0].code;
    } catch (error) {

        if (document.querySelector(".forecasts") !== null) {
            document.querySelector(".forecasts").parentNode.removeChild(document.querySelector(".forecasts"));
        }

        if (document.querySelector(".forecast-info") !== null) {
            document.querySelector(".forecast-info").parentNode.removeChild(document.querySelector(".forecast-info"));
        }
        document.getElementById("forecast").style.display = "none";

    }

    return res;

}


async function today(code) {
    let urlCurr = `http://localhost:3030/jsonstore/forecaster/today/` + code;
    let respCurr = await fetch(urlCurr);
    return await respCurr.json();
}


async function nextDays(code) {
    let urlNext = `http://localhost:3030/jsonstore/forecaster/upcoming/` + code;
    let respNext = await fetch(urlNext);
    return await respNext.json();
}