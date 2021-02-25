import { getWeatherByCity, getWeatherByCityAndDate } from  '../apiService.js';
import { mapIdListToDOMElements } from './DOMActions.js'

class WeatherApp {
    constructor() {
        this.viewElems = {};
        this.initializeApp();
        this.selectedDate;
    }

    initializeApp = () => {
        this.connectToDOMElements();
        this.setupListeners();
        this.setupToday();
    }

    connectToDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapIdListToDOMElements(listOfIds)
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.searchInput.addEventListener('change', this.handleInputChange);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearchBtn);
        this.viewElems.selectedDate.addEventListener('change', this.handleDateChange);
    }

    setupToday = () => {
        const date = new Date();
        const month = date.getMonth().length < 1 ? date.getMonth() +1 : `0${(date.getMonth()+1)}`
        this.viewElems.selectedDate.defaultValue = `${date.getFullYear()}-${month}-${date.getDate()}`
        this.selectedDate = this.viewElems.selectedDate.defaultValue
    }

    handleSubmit = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            this.viewElems.searchInput.style.borderColor = 'black';
            this.viewElems.errorText.innerText  = ''
            this.fadeInOut();
            getWeatherByCity(this.viewElems.searchInput.value)
            .then(data => {
                this.viewElems.weatherCity.innerText = data.title;;
                this.switchView();
                this.fadeInOut();
                this.displayWeatherData(data.consolidated_weather[0]);
            }).catch(() => {
                this.fadeInOut();
                this.viewElems.searchInput.style.borderColor = 'red';
                this.viewElems.errorText.innerText = 'Could not find. Please try again.'
            })
        }
    }

    handleDateChange = (event) => {
        this.selectedDate = event.target.value
        this.fadeInOut();
        getWeatherByCityAndDate(this.viewElems.searchInput.value, this.selectedDate.replaceAll('-', '/'))
        .then(data => {
            this.fadeInOut();
            this.displayWeatherData(data[0]);
        })
    }

    handleInputChange = () => {
        this.viewElems.searchInput.style.borderColor = 'black';
        this.viewElems.errorText.innerText = ''
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
    
    displayWeatherData = weatherData => {
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weatherData.weather_state_abbr}.svg`;
        this.viewElems.weatherIcon.alt = weatherData.weather_state_name;
      
        const currentTemp = weatherData.the_temp.toFixed(2);
        const maxTemp  = weatherData.max_temp.toFixed(2);
        const minTemp  = weatherData.min_temp.toFixed(2);
    
        this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp} °C`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`;
    }

    returnToSearchBtn = () => {
        this.viewElems.searchInput.value = ''
        this.fadeInOut();
        setTimeout(() => {
            this.switchView();
            this.fadeInOut();
        },500);
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());
