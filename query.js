const search = document.querySelector('.search button');
const container = document.querySelector('.container');
const weather = document.querySelector('.weather');
const informations = document.querySelector('.weather-informations');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const apiKey = '074234f5148c5a3ad470fcad382e2a83';
    const city = document.querySelector('.search input').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            if (data.cod == "404") {
                container.style.height = "400px";
                weather.style.display = "none";
                informations.style.display = "none";
                error404.style.display = "block";
                return;
            }

            const image = document.querySelector(".weather img");
            let liveWeather = data.weather[0].main;

            if (liveWeather == "Clear") {
                image.src = "images/clear.png";
            } else if (liveWeather == "Clouds") {
                image.src = "images/cloud.png";
            } else if (liveWeather == "Rain") {
                image.src = "images/rain.png";
            } else if (liveWeather == "Snow") {
                image.src = "images/snow.png";
            } else if (liveWeather == "Haze") {
                image.src = "images/mist.png";
            } else {
                image.src = "";
            }

            // Update the weather details
            const temperature = document.querySelector('#celsius');
            const description = document.querySelector('#cloudiness');
            const humidity = document.querySelector('#humidity .text span');
            const wind = document.querySelector('#wind .text span');

            temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
            container.style.height = '590px';

            informations.style.display = 'flex';
            weather.style.display = 'block';
            error404.style.display = 'none'; 
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
