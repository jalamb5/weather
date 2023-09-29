const submitButton = document.getElementById('submit');
submitButton.onclick = function(event) {
  event.preventDefault();
  const searchQuery = document.getElementById('search').value;
  retrieveWeather(searchQuery);
}

async function retrieveWeather(searchQuery) {
  try {
    // const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=c9d1a59abb4541c3b8b165344232509&q=${searchQuery}`, {mode: 'cors'})
    // const weather = await weatherResponse.json();
    // displayWeather(weather);

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
  const country = document.createElement('p');
  const conditions = document.createElement('p');
  const conditionsIcon = document.createElement('img');

  city.textContent = weather.location.name;
  region.textContent = weather.location.region;
  country.textContent = weather.location.country;

  conditions.textContent = weather.current.condition.text;
  conditionsIcon.src = weather.current.condition.icon;

  location.append(city, region, country);
  currentConditions.append(conditions, conditionsIcon);
};

function displayForecast(forecast) {
  const forecastDiv = document.getElementById('forecast');
  forecast.forecast.forecastday.forEach((day) => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('days');
    const dayText = document.createElement('p');
    const dayIcon = document.createElement('img');

    dayText.textContent = day.day.condition.text;
    dayIcon.src = day.day.condition.icon;

    dayDiv.append(dayText, dayIcon);
    forecastDiv.appendChild(dayDiv);
  })
}
