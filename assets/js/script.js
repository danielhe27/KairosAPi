// variables with my api key link to openweather map  and i use has a preference a metric unit for my data,
const apiKey = '43ce4a0ebf229d5cfe5dc897548dadc0';
const units = 'metric';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q={city}&units=${units}&appid=${apiKey}`;
const cityInput = document.getElementById('cityInput');
const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const weatherIconElement = document.getElementById('weatherIcon');
const historyListElement = document.getElementById('historyList');
const forecastContainer = document.getElementById('forecastContainer');

function getApi(city) {
  if (!city) return;

   // Fetch current weather data
   const currentWeatherUrl = apiUrl.replace('{city}', city);
   fetch(currentWeatherUrl)
   .then(response => response.json())
   .then(data => {
     // Log the raw data to the console
     console.log('Raw Data from API:', data);
     
     // Display current weather information
     displayCurrentWeather(data);
     
     // Save to search history
     saveToHistory(city);
   })
   .catch(error => {
     // Handle errors
     console.error('Error fetching data:', error);
   });
 }

 function displayCurrentWeather(data) {
  // Update the UI with current weather information
  cityNameElement.textContent = data.city.name;
  
  // Display current day's weather
  const currentDay = data.list[0]; 
  const currentDate = new Date(currentDay.dt * 1000);
  const currentDateString = currentDate.toLocaleDateString();
  
  // Display the date
  cityNameElement.textContent = `Weather in ${data.city.name} on ${currentDateString}`;
  
  // Display weather details with variables that i need but can be added more if is necesary
  temperatureElement.textContent = `Temperature: ${currentDay.main.temp.toFixed(2)} °C`;
  windElement.textContent = `Wind: ${currentDay.wind.speed.toFixed(2)} MPH`;
  humidityElement.textContent = `Humidity: ${currentDay.main.humidity}%`;
  
  // Display the weather icon
  const iconCode = currentDay.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
  // Hide the weather icon until data is loaded
  weatherIconElement.src = iconUrl;
  weatherIconElement.alt = currentDay.weather[0].description;

  // Skip the current day and take all available data
  const forecast = data.list.slice(1, data.list.length); 
  // Display 5-day forecast
  displayForecast(forecast);
}

function displayForecast(forecast) {
      // Clear existing forecast content
      forecastContainer.innerHTML = '';
      
      // Create a div to hold the list group items horizontally
      const forecastListContainer = document.createElement('div');
      forecastListContainer.classList.add('list-group', 'd-flex', 'flex-row');
      forecastListContainer.id = 'forecastList';
      
      // Display weather details for each day
      for (let i = 0; i < forecast.length; i += 8) {
        const day = forecast[i];
        const dateString = formatForecastDate(day.dt);
        
        // Create a list group item for each day
        const listItem = document.createElement('div');
        listItem.classList.add('list-group-item', 'text-center');
        
        // Add content to the list item, including the icon
        const temperature = day.main.temp.toFixed(2);
        const wind = day.wind.speed.toFixed(2);
        const humidity = day.main.humidity;
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        
        listItem.innerHTML = `
        <p>${dateString}</p>
        <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;"> <!-- Adjust size here -->
        <p>Temperature: ${temperature} °C</p>
        <p>Wind: ${wind} MPH</p>
        <p>Humidity: ${humidity}%</p>
        `;
        
        forecastListContainer.appendChild(listItem);
      }
       // Append the forecast list container to the forecast container
       forecastContainer.appendChild(forecastListContainer);
      
      }