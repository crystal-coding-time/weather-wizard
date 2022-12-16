// Below are my query selectors
let searchInp = document.querySelector('.weather-search');
let city = document.querySelector('.weather-city');
let day = document.querySelector('.weather-day');
let humidity = document.querySelector('.humidity>.value');
let wind = document.querySelector('.wind>.value');
let pressure = document.querySelector('.pressure>.value');
let image = document.querySelector('.weather-img')
let temperature = document.querySelector('.temperature');

// Below are my API selectors
let weatherAPIKey = 'caaae4a391468490b870f3bb48d1aa3d';
// let geocoding = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
let weatherChecker = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + weatherAPIKey;

let getWeatherByCityName = async (city) => {
    let endpoint = weatherChecker + '&q=' + city;
    let responce = await fetch(endpoint);
    let weather = await responce.json();
    return weather;
    console.log(weather);
}

getWeatherByCityName();

searchInp.addEventListener('keydown', async (e) => {
if(e.keyCode === 13) {
    e.preventDefault(); 
    let weather = await getWeatherByCityName(searchInp.value);
    updateCurrentWeather(weather);
    
}

})

let updateCurrentWeather = (data) => {
    city.textcontent = data.name + ', ' + data.sys.country;
}


// When A user enters a city name into the search Bar
// The Direct geocoding API converts input into geographical coordinates (lat, lon) 
// Then that is passed through to my Current weather data API 
