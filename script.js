document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        document.getElementById('weatherResult').innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    const apiKey = '4f9a9d26b26e86c9815855669c20b444'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const emoji = getWeatherEmoji(weatherDescription);

            document.getElementById('weatherResult').innerHTML = `
                <h2>${data.name} ${emoji}</h2>
                <p>Temperature: ${data.main.temp} °F</p>
                <p>Weather: ${weatherDescription}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
            console.error('Error:', error);
        });
});

function getWeatherEmoji(description) {
    if (description.includes('clear')) {
        return '☀️'; // Sun emoji for clear weather
    } else if (description.includes('cloud')) {
        return '☁️'; // Cloud emoji for cloudy weather
    } else if (description.includes('rain')) {
        return '🌧️'; // Rain cloud emoji for rainy weather
    } else if (description.includes('snow')) {
        return '❄️'; // Snowflake emoji for snowy weather
    } else if (description.includes('thunderstorm')) {
        return '⛈️'; // Thunderstorm emoji for storms
    } else if (description.includes('fog')) {
        return '🌫️'; 
        return '🌈'; 
    }
}