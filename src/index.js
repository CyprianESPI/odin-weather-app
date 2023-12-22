import Weather from "./components/weather";
import Styles from "./styles.css";

// ================= //
// API
// ================= //
const API_KEY = "9ccc8935ccf14bafb50170713232312";

async function getWeatherData(location) {
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}`;
        const response = await fetch(url, {
            mode: "cors", // no-cors, *cors, same-origin);
        });
        console.log("getWeatherData:", response);
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
        console.error("getWeatherData:", error);
    }
}

// ================= //
// DOM interaction
// ================= //
const MAIN = document.querySelector("main");
const RESULT = document.getElementById("result");
const LOCATION = document.getElementById("location");

function updateResult(weather) {
    console.log("updateResult:", weather);
    // Clear DOM if location is empty
    if (weather.location === "") {
        MAIN.style.backgroundImage = "";
        RESULT.innerHTML = "Not found...";
        return;
    }

    // Update DOM
    MAIN.style.backgroundImage = `url(https:${weather.condition_icon})`;
    RESULT.innerHTML =
        `<h2>${weather.location}</h2>
        <p>${weather.condition_text}</p>`;
}

LOCATION.addEventListener('input', (e) => {
    getWeatherData(e.target.value).then(res => {
        updateResult(res);
    }).catch((e) => {
        console.error(e);
        updateResult(new Weather("", "", ""));
    });
});

// ================= //
// Main
// ================= //
function main() {
    console.log("Initialazing...");

    // Get url param location
    const params = new URLSearchParams(document.location.search);
    let location = params.get("location");
    if (location === null)
        location = "Brussels";

    // Update the result
    LOCATION.value = location;
    // Trigger input event to force update of DOM
    const event = new Event('input');
    LOCATION.dispatchEvent(event);

    console.log("Initialazed!");
}

main();
