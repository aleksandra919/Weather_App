import { getWeatherByCity } from  '../apiService.js';
import { mapIdListToDOMElements } from './DOMActions.js'

class WeatherApp {
    constructor() {
        this.viewElems = {};
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectToDOMElements();
        this.setupListeners();
    }

    connectToDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapIdListToDOMElements(listOfIds)
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearchBtn);
    }

    handleSubmit = (event) => {
        if(event.key === 'Enter' || event.type === 'click') {
            this.fadeInOut();
            getWeatherByCity(this.viewElems.searchInput.value)
            .then(data => {
                this.displayWeatherData(data);
            })
        }
    }

    fadeInOut = () => {
        if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
            this.viewElems.mainContainer.style.opacity = '0';
        } else {
            this.viewElems.mainContainer.style.opacity = '1';
        }
    }

    switchView = () => {
        if (this.viewElems.weatherSearchView.style.display !== 'none') {
            this.viewElems.weatherSearchView.style.display = 'none';
            this.viewElems.weatherForecastView.style.display = 'block';
        } else {
            this.viewElems.weatherSearchView.style.display = 'flex';
            this.viewElems.weatherForecastView.style.display = 'none';
        }
    }
    
    displayWeatherData = data => {
        const weather = data.consolidated_weather[0];
    
        this.switchView();
        this.fadeInOut();
    
        this.viewElems.weatherCity.innerText = data.title;;
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
        this.viewElems.weatherIcon.alt = weather.weather_state_name;
      
        const currentTemp = weather.the_temp.toFixed(2);
        const maxTemp  = weather.max_temp.toFixed(2);
        const minTemp  = weather.min_temp.toFixed(2);
    
        this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp} °C`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`;
    }

    returnToSearchBtn = () => {
        this.fadeInOut();
    
        setTimeout(() => {
            this.switchView();
            this.fadeInOut();
        },500);
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());
