const API_KEY = '6d93d9b4a583a40dc5b0d940d0589e97';
        const input = document.getElementById('inputField');
        const showWeather = document.getElementById("showWeather");

        const searchData = async () => {
            const cityName = input.value.trim();

            // Input validation
            if (!cityName) {
                showWeather.innerHTML = `<p class="error-message">Please enter a city name.</p>`;
                return;
            }

            // Show loading spinner
            showWeather.innerHTML = `<div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`;

            try {
                const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
                const fetchData = await fetch(API_URL);
                const response = await fetchData.json();

                if (response.cod === "404") {
                    showWeather.innerHTML = `<p class="error-message">City not found. Please try again.</p>`;
                } else {
                    showData(response);
                }
            } catch (error) {
                showWeather.innerHTML = `<p class="error-message">An error occurred. Please try again later.</p>`;
            }

            // Clear the input field after the search
            input.value = "";
        };

        const showData = (data) => {
            const { main, weather, wind, name } = data;
            showWeather.innerHTML = `
                <img class="icon" src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
                <h1 class="temperature">${main.temp}°C</h1>
                <h2 class="weather-description">${weather[0].main}</h2>
                <div class="additional-info">
                    <p><strong>Humidity:</strong> ${main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
                    <p><strong>City:</strong> ${name}</p>
                </div>
            `;
        };