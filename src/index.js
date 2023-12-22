import Weather from "./components/weather";
import Styles from "./styles.css";

const API_KEY = "1986480656ec490d950204923202611";

async function getWeatherData(location) {
    try {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}`;
        const response = await fetch(url);
        console.log("Response", response);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const json = await response.json();
        console.log("json", json);
        console.log("json str", JSON.stringify(json));

        const current_weather = new Weather(json.current.condition.text, json.current.condition.icon);
        console.log("current_weather:", current_weather);
        return current_weather;
    } catch (error) {
        console.error("Error", error);
    }
}

const currWeather = getWeatherData("Brussels");