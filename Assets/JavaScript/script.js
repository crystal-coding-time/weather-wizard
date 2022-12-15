let weatherAPIKey = 'caaae4a391468490b870f3bb48d1aa3d';
let geocoding = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
let weatherChecker = 'https://api.openweathermap.org/data/2.5/weather?appid' + weatherAPIKey;

let getWeatherByCityName = async (city) => {
    let endpoint = weatherChecker + '&q=' + city;
    let responce = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=london&appid=caaae4a391468490b870f3bb48d1aa3d');
    let weather = await responce.json();
    
    console.log(weather);
}

getWeatherByCityName('london');


// When A user enters a city name into the search Bar
// The Direct geocoding API converts input into geographical coordinates (lat, lon) 
// Then that is passed through to my Current weather data API 
