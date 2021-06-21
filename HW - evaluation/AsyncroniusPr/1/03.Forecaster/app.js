function attachEvents() {
    document.getElementById('submit').addEventListener('click', runCode);
}

async function runCode(e) {

    const div = document.getElementById('forecast');
    div.style = 'display:block';

    const input = document.getElementById('location').value;

    try {
        let code = await getCityCode(input);
        const [today, upcoming] = await Promise.all([

            getToday(code),
            getUpcoming(code)
        ]);
    } catch (error) {
        alert('Error');
    }
    
}


async function getCityCode(name) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const response = await fetch(url);
    const data = await response.json();

    return data.find(f => f.name.toLowerCase() == name.toLowerCase()).code;
}

async function getToday(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
    const response = await fetch(url);
    const data = await response.json();

    const getDivCurr = document.getElementById('current');
    const getDivInside = getDivCurr.querySelectorAll('div')[0];
    getDivCurr.innerHTML = '';
    getDivCurr.appendChild(getDivInside);

    const weather = await setWeather(data);
    getDivCurr.appendChild(weather);
    return getDivCurr;
}


async function getUpcoming(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;
    const response = await fetch(url);
    const data = await response.json();


    const getDivCurr = document.getElementById('upcoming');
    const getDivInside = getDivCurr.querySelectorAll('div')[0];
    getDivCurr.innerHTML = '';
    getDivCurr.appendChild(getDivInside);

    const weather = await setUpcomingWeather(data);
    getDivCurr.appendChild(weather);

    return getDivCurr;
}


async function getUnicode(condition) {
    let unicode = '';
    switch (condition) {
        case 'Sunny': unicode = '\u2600';
            break;
        case 'Partly sunny': unicode = '\u26C5';
            break;
        case 'Overcast': unicode = '\u2601';
            break;
        case 'Rain': unicode = '\u2614';
            break;

    }
    return unicode;
}


async function setWeather(data) {
    const div = document.createElement('div');
    div.className = 'forecasts';

    const mainSpan = document.createElement('span');
    const spanCity = document.createElement('span');
    const spanDegrees = document.createElement('span');
    const spanCond = document.createElement('span');
    mainSpan.className = 'condition';

    spanCity.className = 'forecast-data';
    spanCity.textContent = data.name;

    spanDegrees.className = 'forecast-data';
    spanDegrees.textContent = `${data.forecast.low}\u00B0/${data.forecast.high}\u00B0`;

    spanCond.className = 'forecast-data';
    spanCond.textContent = data.forecast.condition;

    mainSpan.appendChild(spanCity);
    mainSpan.appendChild(spanDegrees);
    mainSpan.appendChild(spanCond);

    const spanSymbol = document.createElement('span');
    const unicode = await getUnicode(data.forecast.condition);
    spanSymbol.textContent = unicode;
    div.appendChild(spanSymbol);
    div.appendChild(mainSpan);

    return div;
}

async function setUpcomingWeather(data) {
    const div = document.createElement('div');
    div.className = 'forecasts-info';

    for (let i = 0; i < data.forecast.length; i++) {

        const mainSpan = document.createElement('span');
        const spanSymbol = document.createElement('span');
        const spanDegrees = document.createElement('span');
        const spanCond = document.createElement('span');
        mainSpan.className = 'upcoming';

        spanSymbol.className = 'symbol';
        const unicode = await getUnicode(data.forecast[i].condition);
        spanSymbol.textContent = unicode;

        spanDegrees.className = 'forecast-data';
        spanDegrees.textContent = `${data.forecast[i].low}\u00B0/${data.forecast[i].high}\u00B0`;
        spanCond.className = 'forecast-data';
        spanCond.textContent = data.forecast[i].condition;
        mainSpan.appendChild(spanSymbol);
        mainSpan.appendChild(spanDegrees);
        mainSpan.appendChild(spanCond);

        div.appendChild(mainSpan);
    }
    return div;
}

attachEvents();