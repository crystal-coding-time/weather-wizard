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
let weatherChecker = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' + weatherAPIKey;
let forecastChecker = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=' + weatherAPIKey;
let cityBaseEndpoint = 'https://api.teleport.org/api/cities/?search=';

let getWeatherByCityName = async (citystring) =>{ //This is an async function which paits for the answer of the API
  let city;
  if(citystring.includes(',')) {
    city = citystring.substring(0, citystring.indexOf(',')) + citystring.substring(citystring.lastIndexOf(','));
  } else {
    city = citystring;
  }
  let endpoint = weatherChecker + '&q=' + city;
  let response = await fetch(endpoint);
  if(response.status !== 200) {
    alert('City Not Found!');
    return;
  }
  let weather = await response.json();
  return weather;
}

let getForcastByCityID = async(id) => {
    let endpoint = forecastChecker + '&id=' +id;
    let result = await fetch(endpoint);
    let forecast = await result.json();
    let forcastList = forecast.list;
    let daily = [];
  
    forcastList.forEach(day => {
      let date = new Date(day.dt_txt.replace(' ', 'T'));
      let hours = date.getHours();
      if(hours === 12) {
        daily.push(day)
      }
    })
    return daily;
  }
  
  let weatherForCity = async (city) => {
    let weather = await getWeatherByCityName(city);
      if(!weather) {
        return;
      }
      let cityID = weather.id;
      updateCurrentWeather(weather);
      let forcast = await getForcastByCityID(cityID);
      updateForcast(forcast);
  }
  
  let init = (city) => {
    weatherForCity(city).then(() => document.body.style.filter = 'blur(0)');
  }
  
  init();

// The below code triggers the function once the city is entered into the seach bar and the enter key is pressed
searchInp.addEventListener('keydown', async (e) => {
if(e.keyCode === 13) {
    e.preventDefault(); 
    let weather = await getWeatherByCityName(searchInp.value);
    updateCurrentWeather(weather);
    init(searchInp.value);
}

})

searchInp.addEventListener('input', async () => {
    let endpoint = cityBaseEndpoint + searchInp.value;
    let result = await (await fetch(endpoint)).json();
    suggestions.innerHTML = '';
    let cities = result._embedded['city:search-results'];
    let length = cities.length > 5 ? 5 :cities.length;
    for(let i =0; i<length; i++) {
      let option = document.createElement('option');
      option.value = cities[i].matching_full_name;
      suggestions.appendChild(option);
    }
  })

  let updateCurrentWeather = (data) => {
    city.textContent = data.name + ', ' + data.sys.country; // This displays the city name and country targeting city.innerHTML 
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity; // This displays the humidity targeting humidity.innerHTML
    pressure.textContent = data.main.pressure; // This displays the pressure targeting pressure.innerHTML
    
    // The below code determines the wind direction by taking the degrees from the main data set and translating it to N/E/S/W
    
    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135){
      windDirection = 'East';
    } else if(deg > 135 && deg <= 225){
      windDirection = 'South';
    } else if(deg > 225 && deg <= 315){
      windDirection = 'West';
    } else {
      windDirection = 'North';
    }
    wind.textContent = windDirection + ',  ' + data.wind.speed;
    temperature.textContent = data.main.temp > 0 ?
                                '+' + Math.round(data.main.temp) :
                                Math.round(data.main.temp); // This displays the temperature targeting the temperature.innerHTML
    let imgID = data.weather[0].id;
    weatherImages.forEach(obj => {
      if(obj.ids.includes(imgID)) {
        image.src = obj.url;
      }
    })                            
  }

  let updateForcast = (forcast) => {
    console.log(forcast);
    forecastBlock.innerHTML = "";
    forcast.forEach((day) => {
      let weatherImg = "";
      let dayName = dayOfWeek(day.dt * 1000);
      let temperature =
        day.main.temp > 0
          ? "+" + Math.round(day.main.temp)
          : Math.round(day.main.temp);
  
      //display the images from the response in forecast
      var icons = day.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + icons + ".png";
      weatherImg = iconUrl;
  
      let forcastItem = `
          <article class="weather-item col-2 text-center">
          <img width="100px" src="${weatherImg}" alt="${day.weather[0].description}" class="weather-img">
          <h3 class="weather-day">${dayName}</h3>
          <p class="weather-temp img-fluid">${temperature} &deg;F</p>
          </article>`;
      forecastBlock.insertAdjacentHTML("beforeend", forcastItem);
    });
  };

// The below code displays the day of the week targeting day.innerHTML 
let dayOfWeek = (dt = new Date().getTime()) => {
  return new Date(dt).toLocaleDateString('en-EN', {'weekday': 'long'});
}