import { getWeatherByCity } from  '../apiService.js'

const viewElems = {}

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
}

const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = () => {
    if(event.key === 'Enter') {
        getWeatherByCity(viewElems.searchInput.value).then(data => console.log('data', data))
    }
}

const onClickSubmit = () => {
    getWeatherByCity(viewElems.searchInput.value).then(data => console.log('data', data))
}

// nie uzywamy nawiasów przy listenerach, tylko przekazujemy referencje funkcji
document.addEventListener('DOMContentLoaded', initializeApp)