function showTemperature(response) {
  let name = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);

  let currentTemperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");
  let highestTemp = document.querySelector("#highTemp");
  let lowestTemp = document.querySelector("#lowTemp");
  let currentName = document.querySelector("h1");
  let icon = document.querySelector("#weatherIcon");

  currentTemperature.innerHTML = `${temperature}`;
  weatherDescription.innerHTML = `${description}`;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${wind} km/h`;
  highestTemp.innerHTML = `${tempMax} ° |`;
  lowestTemp.innerHTML = `${tempMin} °`;
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
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);

  let currentName = document.querySelector("h1");
  let currentTemperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");
  let highestTemp = document.querySelector("#highTemp");
  let lowestTemp = document.querySelector("#lowTemp");
  let icon = document.querySelector("#weatherIcon");

  currentName.innerHTML = `${name}`;
  currentTemperature.innerHTML = `${temperature}`;
  weatherDescription.innerHTML = `${description}`;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${wind} km/h`;
  highestTemp.innerHTML = `${tempMax} ° |`;
  lowestTemp.innerHTML = `${tempMin} °`;
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
}
function searchingCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let apiKey = "02cf53f923b1744f0dbdf803cfd893b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showInformation);
}
let search = document.querySelector("#search-form");
search.addEventListener("click", searchingCity);
