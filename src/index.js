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
    } catch (error) {
        console.error("Error", error);
    }
}

getWeatherData("Brussels");