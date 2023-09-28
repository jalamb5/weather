const submitButton = document.getElementById('submit');
submitButton.onclick = function(event) {
  event.preventDefault();
  const searchQuery = document.getElementById('search').value;
  retrieveForecast(searchQuery);
}

async function retrieveForecast(searchQuery) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c9d1a59abb4541c3b8b165344232509&q=${searchQuery}`, {mode: 'cors'})
    const forecast = await response.json();
    console.log(forecast);
    displayForecast(forecast);
  } catch (error) {
    console.log(error.message);
  }
}

function displayForecast(forecast) {
  const location = document.getElementById('location');
  const currentConditions = document.getElementById('current-conditions');
  const city = document.createElement('h2');
  const region = document.createElement('p');
  const country = document.createElement('p');
  const conditions = document.createElement('p');
  const conditionsIcon = document.createElement('img');

  city.textContent = forecast.location.name;
  region.textContent = forecast.location.region;
  country.textContent = forecast.location.country;

  conditions.textContent = forecast.current.condition.text;
  conditionsIcon.src = forecast.current.condition.icon;

  location.append(city, region, country);
  currentConditions.append(conditions, conditionsIcon);
};
