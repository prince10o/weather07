const apiKey = "dd8a5ea308eea403cb1606ed5fcfba55";
const weatherDetailsElement = document.getElementById("weatherDetails");
const forecastElement = document.getElementById("forecast");
let units = "metric";

function getWeather() {
  const cityInput = document.getElementById("cityInput").value;
  if (cityInput === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayWeatherDetails(data);
      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=${units}&appid=${apiKey}`
      );
    })
    .then((response) => response.json())
    .then((data) => displayForecast(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function displayWeatherDetails(data) {
  weatherDetailsElement.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°</p>
        <p>Min/Max Temperature: ${data.main.temp_min}°/${data.main.temp_max}°</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s, ${data.wind.deg}°</p>
        <p>Description: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}

function displayForecast(data) {
  forecastElement.innerHTML = "<h2>5-Day Forecast</h2>";
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    forecastElement.innerHTML += `
            <div class="forecast-item">
                <p>Date: ${forecast.dt_txt}</p>
                <p>Avg. Temperature: ${forecast.main.temp}°</p>
                <p>Description: ${forecast.weather[0].description}</p>
                <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather Icon">
            </div>
        `;
  }
}

function toggleUnits() {
  units = units === "metric" ? "imperial" : "metric";
  getWeather();
}
