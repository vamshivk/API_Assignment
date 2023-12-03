var cityName = 'London';
var limit = 5;
var apiKey = 'a2d10b6b54c65117ce62332513a7c1d2';
var londonLat = 51.5073219;
var londonLon = -0.1276474;
var tokyoLat = 35.682839;
var tokyoLon = 139.759455;

var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${londonLat}&lon=${londonLon}&appid=${apiKey}`;
var apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${tokyoLat}&lon=${tokyoLon}&appid=${apiKey}`;

// Function to update the HTML element with fetched data
function updateWeatherData(data) {
        var weatherDataElement = document.getElementById("weatherData");
        var formattedWeatherData = 'Current weather of London, United Kingdom:\n\n';
      
        if (data) {
          formattedWeatherData += `Temperature: ${data.main.temp} K\n`;
          formattedWeatherData += `Feels Like: ${data.main.feels_like} K\n`;
          formattedWeatherData += `Minimum Temperature: ${data.main.temp_min} K\n`;
          formattedWeatherData += `Maximum Temperature: ${data.main.temp_max} K\n`;
          formattedWeatherData += `Pressure: ${data.main.pressure} hPa\n`;
          formattedWeatherData += `Humidity: ${data.main.humidity} %\n`;
      
          weatherDataElement.innerText = formattedWeatherData;
        } else {
          weatherDataElement.innerHTML = "No weather data available";
        }
}

function updateForecastData(data) {
        var forecastDataElement = document.getElementById("forecastData");
    
        if (data && data.list) {
            var forecastString = '5-day forecast for Tokyo, Japan:\n\n';
            var forecastDataByDate = {};
    
            data.list.forEach((forecast) => {
                const timestamp = forecast.dt_txt;
                const date = timestamp.substring(0, 10);
    
                // Only add the first reading for each date
                if (!forecastDataByDate[date]) {
                    const time = timestamp.substring(11, 19);
                    const temperature = forecast.main.temp;
                    const feelsLike = forecast.main.feels_like;
                    const tempMin = forecast.main.temp_min;
                    const tempMax = forecast.main.temp_max;
                    const pressure = forecast.main.pressure;
                    const humidity = forecast.main.humidity;
    
                    forecastDataByDate[date] = {
                        time,
                        temperature,
                        feels: feelsLike,
                        tempMin,
                        tempMax,
                        pressure,
                        humidity,
                    };
                }
            });
    
            // Display the forecast report
            for (const date in forecastDataByDate) {
                forecastString += `Date: ${date}\n`;
                const forecast = forecastDataByDate[date];
                forecastString += `Time: ${forecast.time}\n`;
                forecastString += `Temperature: ${forecast.temperature} K\n`;
                forecastString += `Feels Like: ${forecast.feels} K\n\n`;
            }
    
            forecastDataElement.innerHTML = forecastString;
        } else {
            forecastDataElement.innerHTML = 'No forecast data available';
        }
    }
        
    // Fetch and update weather data
    fetch(apiUrlWeather)
        .then(response => response.json())
        .then(updateWeatherData)
        .catch(error => {
            console.log('Fetching Weather API error:', error);
            updateWeatherData(null);
        });
    
    // Fetch and update forecast data
    fetch(apiUrlForecast)
        .then(response => response.json())
        .then(updateForecastData)
        .catch(error => {
            console.log('Fetching Forecast API error:', error);
            updateForecastData(null);
        });
    