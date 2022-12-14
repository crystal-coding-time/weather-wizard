let weatherAPIKey = 'caaae4a391468490b870f3bb48d1aa3d';
let geocoding = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';
let weatherChecker = 'https://api.openweathermap.org/data/2.5/weather?';

let getWeatherByCityName = async (city) => {
    let endpoint = weatherChecker + 'q=' + city + weatherAPIKey;
    let responce = await fetch(endpoint);

    console.log(responce);
}



getWeatherByCityName('london');