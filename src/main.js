import { getWeatherByCity } from  '../apiService.js'

let viewElems = {}

const getDOMElem = id => document.getElementById(id);

const connectHTMLElems = () => {
    viewElems.mainContainer = getDOMElem('mainContainer');
    viewElems.weatherSearchView = getDOMElem('weatherSearchView');
    viewElems.weatherForecastView = getDOMElem('weatherForecastView');
  
    viewElems.searchInput = getDOMElem('searchInput');
    viewElems.searchButton = getDOMElem('searchButton');
    viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');
  
    viewElems.weatherCity = getDOMElem('weatherCity');
    viewElems.weatherIcon = getDOMElem('weatherIcon');
  
    viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');
  
    viewElems.returnToSearchBtn = getDOMElem('returnToSearchBtn');
}

const setupListeners = () => {
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit)
    viewElems.searchButton.addEventListener('click', onClickSubmit)
    viewElems.returnToSearchBtn.addEventListener('click', onReturn);
}

const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = event => {
    if(event.key === 'Enter') {
        fadeInOut();
        getWeatherByCity(viewElems.searchInput.value)
        .then(data => {
            displayWeatherData(data)
        })
    }
}

const onClickSubmit = () => {
    fadeInOut();
    getWeatherByCity(viewElems.searchInput.value)
        .then(data => {
            displayWeatherData(data)
        })
}

const switchView = () => {
    if (viewElems.weatherSearchView.style.display !== 'none') {
        viewElems.weatherSearchView.style.display = 'none'
        viewElems.weatherForecastView.style.display = 'block'
    } else {
        viewElems.weatherSearchView.style.display = 'flex'
        viewElems.weatherForecastView.style.display = 'none'
    }
}

const onReturn = () => {
    fadeInOut();
    setTimeout(() => {
        switchView();
        fadeInOut();
    },500);
}

const fadeInOut = () => {
    if (viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
        viewElems.mainContainer.style.opacity = '0'
    } else {
        viewElems.mainContainer.style.opacity = '1'
    }
}

const displayWeatherData = data => {
    const weather = data.consolidated_weather[0]

    switchView();
    fadeInOut();

    viewElems.weatherCity.innerText = data.title;;
    viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`
    viewElems.weatherIcon.alt = weather.weather_state_name
  
    const currentTemp = weather.the_temp.toFixed(2);
    const maxTemp  = weather.max_temp.toFixed(2);
    const minTemp  = weather.min_temp.toFixed(2);

    viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp} °C`;
    viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`;
    viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`;
}
// nie uzywamy nawiasów przy listenerach, tylko przekazujemy referencje funkcji
document.addEventListener('DOMContentLoaded', initializeApp)