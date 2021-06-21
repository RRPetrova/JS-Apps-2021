function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);
}

attachEvents();

async function getWeather(){
    // GET FORECAST
    const input = document.getElementById('location');
    const cityName = input.value

    const code  = await getCode(cityName);
    const current  = await getCurrent(code);
    const upcomming = await getUpcoming(code);
    
    let symbol = current.condition

	//Get element by get element by ID

    let div = document.getElementById('div');
    div.style.display = 'block';
    let divToAppend = document.getElementById('current');
    let secondDivToAppend = document.getElementById('upcoming');
   let icons = {
        "Sunny": "☀",
        "Partly sunny": "⛅",
        "Overcast": "☁",
        "Rain": "☂",
        "Degrees": "°"
    }




    divToAppend.appendChild(e('div', { 'className': 'forecasts' }, e('span', {'className': 'condition symbol'}, `${icons[current["condition"]]}`)),
    e('span', {'className': 'condition'}, 
    e('span', {'className': 'forecast-data'}, `$cirrent.conditionSymbol`), 
    e('span', {'className': 'forecast-data'}, `$current.forecast.low/ $current.forecast.high`),
    e('span', {'className': 'forecast-data'}, `$current.forecast.condition`), 
) 	

    secondDivToAppend.appendChild(e('div', { 'className': 'forecast-info' }));


    upcoming.forecast.forEach((d) => {document.getElementById('forecast-info')
    .appendChild(e('span', {'className': 'upcoming'}, e('span', {'className': 'symbol'}, `${d.icons}`),
    e('span', {'className': 'forecast-data'}, `$d.forecast.low/ $current.forecast.high`),
    e('span', {'className': 'forecast-data'}, `$d.forecast.condition`) ) })
    


    

}

async function getCode(cityName){
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    const response = await fetch(url);
    const data = await response.json();

    return data.find(x => x.name.toLowerCase() = cityName.toLowerCase()).code;


}
async function getCurrent(code){
    // get current conndition by 
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;

    const response = await fetch(url);
    const data = await response.json();

    return data;

}

async function getUpcoming(code){
    //get upcoming forecas
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const response = await fetch(url);
    const data = await response.json();

    return data;
};

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