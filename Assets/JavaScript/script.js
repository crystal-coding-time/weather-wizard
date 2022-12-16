// Below are my query selectors
let searchInp = document.querySelector('.weather-search');
let city = document.querySelector('.weather-city');
let day = document.querySelector('.weather-day');
let humidity = document.querySelector('.humidity>.value');
let wind = document.querySelector('.wind>.value');
let pressure = document.querySelector('.pressure>.value');
let image = document.querySelector('.weather-img')
let temperature = document.querySelector('.temperature>.value');
let forecastBlock = document.querySelector('.five-day-forecast');
let suggestions = document.querySelector('#suggestions');

// Below are my API selectors
let weatherAPIKey = 'caaae4a391468490b870f3bb48d1aa3d';
// let geocoding = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
let weatherChecker = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + weatherAPIKey;
let forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=' + weatherAPIKey;
let cityBaseEndpoint = 'https://api.teleport.org/api/cities/?search=';

let getWeatherByCityName = async (city) => {
    let endpoint = weatherChecker + '&q=' + city;
    let response = await fetch(endpoint);
    if(response.status !== 200) {
        alert('City Not Found!');
        return;
      }
      let weather = await response.json();
      return weather;
}

// getWeatherByCityName();

searchInp.addEventListener('keydown', async (e) => {
if(e.keyCode === 13) {
    e.preventDefault(); 
    let weather = await getWeatherByCityName(searchInp.value);
    updateCurrentWeather(weather);
    
}

})

let updateCurrentWeather = (data) => {
    console.log(data);
    city.innerHTML = data.name + ', ' + data.sys.country; // This displays the city name and country targeting city.innerHTML 
    day.innerHTML = dayOfWeek();
    humidity.innerHTML = data.main.humidity; // This displays the humidity targeting humidity.innerHTML
    pressure.innerHTML = data.main.pressure; // This displays the pressure targeting pressure.innerHTML
    
    // The below code determines the wind direction by taking the degrees from the main data set and translating it to N/E/S/W

    let windDirection = '';
    let deg = data.wind.deg;
    if (deg > 45 && deg <= 135) {
        windDirection = 'East';
    } else if (deg > 135 && deg <= 225) {
        windDirection = 'South';
    } else if (deg > 225 && deg <= 315) {
        windDirection = 'West';
    } else {
        windDirection = 'North';
    };
    
    wind.innerHTML = windDirection + ', ' + data.wind.speed // This displays the wind speed and direction targeting wind.innerHTML 
    temperature.textContent = data.main.temp > 0 ? 
        '+' + Math.round(data.main.temp) : 
              Math.round(data.main.temp); // This displays the temperature targeting the temperature.innerHTML
}

// The below code displays the day of the week targeting day.innerHTML 
let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-EN', {'weekday': 'long'});
}

// When A user enters a city name into the search Bar
// The Direct geocoding API converts input into geographical coordinates (lat, lon) 
// Then that is passed through to my Current weather data API 
