function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);


}

attachEvents();

async function getWeather() {
    const input = document.getElementById('location');
    const cityName = input.value;
    input.value = '';

    document.getElementById('forecast').style.display = '';

    clearScreen();

    const code = await getCode(cityName);

    const [current, upcoming] = await Promise.all([
        getToday(code),
        getUpcoming(code)
    ])



    const symbols = {

        Sunny: '\u2600',// ☀
        'Partly sunny': '\u26C5', // ⛅
        Overcast: '\u2601',//☁
        Rain: '\u2614',// ☂
        Degrees: '\u02DA' // °

    }

    let symbol = symbols[current.forecast.condition];
    let name = current.name;
    let degree = `${current.forecast.low}${symbols.Degrees}/${current.forecast.high}${symbols.Degrees}`
    let condition = current.forecast.condition;


    const currentDiv = document.getElementById('current');
    const forecast = e('div', { className: 'forecasts' },
        e('span', { className: 'condition symbol' }, symbol),
        e('span', { className: 'condition' },
            e('span', { className: 'forecast-data' }, name),
            e('span', { className: 'forecast-data' }, degree),
            e('span', { className: 'forecast-data' }, condition)
        )
    );

    currentDiv.appendChild(forecast);

    const upcomingDiv = document.getElementById('upcoming');
    const forecastDiv = e('div', { className: 'forecast-info' },);

    Object.entries(upcoming.forecast).map(createForecast).forEach(x => forecastDiv.appendChild(x))

    upcomingDiv.appendChild(forecastDiv);

    function createForecast(up) {

        let symbol = symbols[up[1].condition];
        let degree = `${up[1].low}${symbols.Degrees}/${up[1].high}${symbols.Degrees}`
        let condition = up[1].condition;

        const result = e('span', { className: 'upcoming' },
            e('span', { className: 'symbol' }, symbol),
            e('span', { className: 'forecast-data' }, degree),
            e('span', { className: 'forecast-data' }, condition)
        );
        return result
    }

}

async function getCode(cityName) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    try {
        const responce = await fetch(url);
        const data = await responce.json();
        return data.find(x => x.name.toLowerCase() == cityName.toLowerCase()).code;
    }
    catch {
        const curDiv = document.getElementById('current');
        const err = document.createElement('span');
        err.textContent = 'ERROR'
        err.className = 'error'

        curDiv.appendChild(err);
    }



}

async function getToday(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;

    const responce = await fetch(url);
    const data = await responce.json();

    return data
}

async function getUpcoming(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const responce = await fetch(url);
    const data = await responce.json();

    return data
}


function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {


            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}


function clearScreen() {
    //Clear forecast and upcoming section if any  
    let today = document.getElementsByClassName('forecasts')[0];
    let nextDays = document.getElementsByClassName('forecast-info')[0];

    if (today != null && nextDays != null) {
        today.remove();
        nextDays.remove();
    }

    //Clear Error message if any
    let errorMsg = document.getElementsByClassName('error')[0];
    if (errorMsg) {
        errorMsg.remove();
    }
}