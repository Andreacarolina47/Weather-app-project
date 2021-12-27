function showTemperature(response) {
  let name = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let currentTemperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");

  let currentName = document.querySelector("h1");
  let icon = document.querySelector("#weatherIcon");

  currentTemperature.innerHTML = `${temperature}`;
  weatherDescription.innerHTML = `${description}`;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${wind} km/h`;

  currentName.innerHTML = `${name}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let now = new Date();
  let time = document.querySelector(".currentTime");
  let hour = now.getHours();
  let AmOrPm = hour >= 12 ? "pm" : "am";
  let currentHour = hour % 12 || 12;
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  time.innerHTML = `Last updated: ${day}, ${currentHour}:${minutes} ${AmOrPm}`;

  getCurrentForecast(response.data.coord);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "02cf53f923b1744f0dbdf803cfd893b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentWeather = document.querySelector("#currentButton");
currentWeather.addEventListener("click", showCurrent);

function showInformation(response) {
  let name = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let currentName = document.querySelector("h1");
  let currentTemperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");

  let icon = document.querySelector("#weatherIcon");

  currentName.innerHTML = `${name}`;
  currentTemperature.innerHTML = `${temperature}`;
  weatherDescription.innerHTML = `${description}`;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${wind} km/h`;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let now = new Date();
  let time = document.querySelector(".currentTime");
  let hour = now.getHours();
  let AmOrPm = hour >= 12 ? "pm" : "am";
  let currentHour = hour % 12 || 12;
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  time.innerHTML = `Last updated: ${day}, ${currentHour}:${minutes} ${AmOrPm}`;

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "02cf53f923b1744f0dbdf803cfd893b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showInformation);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  search(cityName.value);
}

function getForecast(coordinates) {
  let apiKey = "02cf53f923b1744f0dbdf803cfd893b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="">
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-maxtemp">${Math.round(
                forecastDay.temp.max
              )}°|</span>
              <span class="weather-forecast-mintemp">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
          
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCurrentForecast(coordinates) {
  let apiKey = "02cf53f923b1744f0dbdf803cfd893b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentForecast);
}

function showCurrentForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="">
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-maxtemp">${Math.round(
                forecastDay.temp.max
              )}°|</span>
              <span class="weather-forecast-mintemp">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
          
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("click", handleSubmit);

search("Barcelona");
