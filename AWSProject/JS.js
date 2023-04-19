const form = document.querySelector('form');
const input = document.querySelector('#location');
const weatherData = document.querySelector('#weather-data');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = input.value;
  if (location) {
    getWeatherData(location);
    input.value = '';
  }
});

function getWeatherData(location) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '56ec6f09c8mshfd6706dfee82350p12885ajsnedefcda8d63e',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`, options)
    .then(response => response.json())
    .then(response => {
      weatherData.innerHTML =   `
      <div class = "WeatherToday">
        <h2>Weather Forecast for Today in ${response.location.name}, ${response.location.country}</h2>
        <ul>
          <li>Chance of Precipitation: ${response.forecast.forecastday[0].day.daily_chance_of_rain}%</li>
          <meter value="${response.forecast.forecastday[0].day.daily_chance_of_rain}" max="100" min="0" low="75" optimum="50" high="25"></meter>
          <li>Current Temperature: ${response.current.temp_c} &#8451;</li>
		  <meter value="${response.current.temp_c}" max="50" min="0" low="75" optimum="20" high="10"></meter>
          <li>Condition: ${response.current.condition.text}</li>
          <li>Wind Speed: ${response.current.wind_kph} km/h</li>
          <li>Humidity: ${response.current.humidity}%</li>
        </ul>
        </div>

        <aside class = "WeatherFuture">
        <h3>Forecast for the Next 3 Days:</h3>
        <ul >
          ${response.forecast.forecastday.map(day => `
            <li>
            <h4>${new Date(day.date).toLocaleDateString('en-US', {weekday: 'long'})}, ${day.date}</h4>
              <p>Chance of Precipitation: ${day.day.daily_chance_of_rain}%</p>
			  <meter value="${day.day.daily_chance_of_rain}" max="100" min="0" low="75" optimum="50" high="25"></meter>
			<li>Predicted Temperature: ${day.day.avgtemp_c} &#8451;</li>
		  <meter value="${day.day.avgtemp_c}" max="50" min="0" low="75" optimum="20" high="10"></meter>
              <p>High Temperature: ${day.day.maxtemp_c} &#8451;</p>
              <p>Low Temperature: ${day.day.mintemp_c } &#8451;</p>
              <p>Condition: ${day.day.condition.text}</p>
              
            </li>
          `).join('')}
        </ul> </aside>
      `;
    })
    .catch(err => {
      console.error(err);
      weatherData.innerHTML = '<p>Unable to retrieve weather data for that location. Please try again.</p>';
    });
}
