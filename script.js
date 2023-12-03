document.addEventListener('DOMContentLoaded', () => {
    const fetchDataBtn = document.getElementById('fetchDataBtn');

    fetchDataBtn.addEventListener('click', () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                await fetchWeatherData(latitude, longitude);
                displayMap(latitude, longitude);
            });
        } else {
            alert('Geolocation is not supported.');
        }
    });
});

async function fetchWeatherData(latitude, longitude) {
    const apiKey = '<iframe src="https://maps.google.com/maps?q=35.856737, 10.606619&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayMap(latitude, longitude) {
    const mapDiv = document.getElementById('map');
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 10
    };
    const map = new google.maps.Map(mapDiv, mapOptions);

    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Your Location'
    });
}

function displayWeatherData(data) {
    const weatherDataContainer = document.getElementById('weatherData');
    // Display weather details using 'data' object
    // Example: weatherDataContainer.innerHTML = `<p>${data.current.temp} °C</p>`;
}
