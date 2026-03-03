const citySearch = document.querySelector(".container__weather--input");
const weatherForm = document.querySelector("#weather-form"); // Form select kiya
const weatherCity = document.querySelector(".container__weather--city");
const weatherDate = document.querySelector(".container__weather--date");
const weatherButton = document.querySelector(".container__weather--button");
const weatherTemperature = document.querySelector(".container__weather--temperature");
const weatherMinimum = document.querySelector(".container__weather--minimum");
const weatherMaximum = document.querySelector(".container__weather--maximum");
const weatherIcon = document.querySelector("#w-icon");

const weatherFeels = document.querySelector(".container__weather--feels");
const weatherHumidity = document.querySelector(".container__weather--humidity");
const weatherWind = document.querySelector(".container__weather--wind");
const weatherPressure = document.querySelector(".container__weather--pressure");

const getCountryName = (code) => new Intl.DisplayNames(["en"], { type: "region" }).of(code);

const getFullDay = (dt) => {
    const curDate = new Date(dt * 1000);
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

const getWeatherData = async (city) => {
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aee6692ce8d955681844551ade28c8d8&units=metric`;

    try {
        const response = await fetch(weatherApi);
        if(!response.ok) throw new Error("City not found");
        const data = await response.json();

        const { main, name, weather, wind, sys, dt } = data;

        weatherCity.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        weatherDate.innerHTML = getFullDay(dt);
        weatherButton.innerHTML = weather[0].main;
        
        // Icon handling
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
        
        weatherTemperature.innerHTML = `${main.temp.toFixed(1)}°C`;
        weatherMinimum.innerHTML = `Min: ${main.temp_min.toFixed(0)}°`;
        weatherMaximum.innerHTML = `Max: ${main.temp_max.toFixed(0)}°`;

        weatherFeels.innerHTML = `<i class="fas fa-thermometer-half"></i> Feels: ${main.feels_like.toFixed(1)}°`;
        weatherHumidity.innerHTML = `<i class="fas fa-droplet"></i> Hum: ${main.humidity}%`;
        weatherWind.innerHTML = `<i class="fas fa-wind"></i> ${wind.speed} m/s`;
        weatherPressure.innerHTML = `<i class="fas fa-gauge"></i> ${main.pressure} hPa`;

    } catch (err) {
        weatherCity.innerHTML = "City Not Found!";
    }
};

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const city = citySearch.value.trim();
    if (city) {
        getWeatherData(city);
        citySearch.value = ""; 
        citySearch.blur(); 
    }
});

window.onload = () => {
    getWeatherData("Delhi");
};