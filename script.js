const submitButton = document.getElementById('submit');
submitButton.onclick = function(event) {
  event.preventDefault();
  const searchQuery = document.getElementById('search').value;
  retrieveWeather(searchQuery);
}

async function retrieveWeather(searchQuery) {
  try {
    cleanup();

    const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c9d1a59abb4541c3b8b165344232509&q=${searchQuery}&days=4`, {mode: 'cors'})
    const forecast = await forecastResponse.json();
    displayForecast(forecast);
    displayWeather(forecast);
  } catch (error) {
    console.log(error.message);
  }
}

function displayWeather(weather) {
  const location = document.getElementById('location');
  const currentConditions = document.getElementById('current-conditions');
  const city = document.createElement('h2');
  const region = document.createElement('p');
  const title = document.createElement('h3');
  const conditions = document.createElement('p');
  const conditionsIcon = document.createElement('img');

  city.textContent = weather.location.name;
  region.textContent = `${weather.location.region}, ${weather.location.country}`;
  region.classList.add('secondary');

  title.textContent = 'Current Conditions';
  conditions.textContent = weather.current.condition.text;
  conditionsIcon.src = weather.current.condition.icon;

  location.append(city, region);
  currentConditions.append(title, conditions, conditionsIcon);
};

function displayForecast(forecast) {
  const forecastDiv = document.getElementById('forecast');
  forecast.forecast.forecastday.forEach((day) => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('days');
    const dayDate = document.createElement('h4');
    const dayText = document.createElement('p');
    const dayIcon = document.createElement('img');

    dayDate.textContent = day.date;
    dayText.textContent = day.day.condition.text;
    dayIcon.src = day.day.condition.icon;

    dayDiv.append(dayDate, dayIcon, dayText);
    forecastDiv.appendChild(dayDiv);
  })
}

function cleanup() {
  const location = document.getElementById('location');
  const currentConditions = document.getElementById('current-conditions');
  const forecastDiv = document.getElementById('forecast');

  [location, currentConditions, forecastDiv].forEach((div) => {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  })
}
