export const getWeatherByCity = city => {
    return fetch(
        `https://www.metaweather.com/api/location/search/?query=${city}`
    )
    .then(response =>  response.json())
    .then(data => { const woeid = data[0].woeid;
        return fetch(
            `https://www.metaweather.com/api/location/${woeid}`
        ).then(response => response.json().then(data => data));
    });
}


export const getWeatherByCityAndDate = (city, selectedDate) => {
    return fetch(
        `https://www.metaweather.com/api/location/search/?query=${city}`
    )
    .then(response =>  response.json())
    .then(data => { const woeid = data[0].woeid;
        return fetch(
            `https://www.metaweather.com/api/location/${woeid}/${selectedDate}`
        ).then(response => response.json().then(data => data));
    });
}
