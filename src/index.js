import Weather from "./components/weather";
import Styles from "./styles.css";

const API_KEY = "1986480656ec490d950204923202611";

async function getWeatherData(location) {
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}`;
        const response = await fetch(url);
        console.log("Response", response);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const json = await response.json();
        console.log("json", json);
        //console.log("json str", JSON.stringify(json));

        const current_weather = new Weather(json.current.condition.text, json.current.condition.icon, json.location.name);
        //console.log("current_weather:", current_weather);
        return current_weather;
    } catch (error) {
        console.error("Error", error);
    }
}

// DOM interaction
const MAIN = document.querySelector("main");
const RESULT = document.getElementById("result");
const LOCATION = document.getElementById("location");

function updateResult(weather) {
    //RESULT.style.color = "red";
    MAIN.style.backgroundImage = `url(https:${weather.condition_icon})`;
    RESULT.innerHTML =
        `<h2>${weather.location}</h2>
        <p>${weather.condition_text}</p>`;
}

LOCATION.addEventListener('input', (e) => {
    getWeatherData(e.target.value).then(res => {
        console.log(res);
        updateResult(res);
    });
});

// Main
getWeatherData("Brussels").then(res => {
    console.log(res);
    updateResult(res);
});

console.log("Loaded");