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
 
 