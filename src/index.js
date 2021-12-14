let now = new Date();
let time = document.querySelector("h2");
let hour = now.getHours();
let minutes = now.getMinutes();
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
time.innerHTML = `${day}, ${hour}:${minutes}`;

function showTemperature(response) {
  let name = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;

  let currentTemperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentName = document.querySelector("h1");

  currentTemperature.innerHTML = `${temperature} °C`;
  weatherDescription.innerHTML = `${description}`;
  currentHumidity.innerHTML = `Humidity:${humidity}%`;
  currentName.innerHTML = `${name}`;
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
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let currentTemperature = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  currentTemperature.innerHTML = `${temperature} °C`;
  weatherDescription.innerHTML = `${description}`;
  currentHumidity.innerHTML = `Humidity:${humidity}%`;
}
function searchingCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${cityName.value}`;
  let apiKey = "02cf53f923b1744f0dbdf803cfd893b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showInformation);
}
let search = document.querySelector("#search-form");
search.addEventListener("click", searchingCity);
