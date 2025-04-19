import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const cities = ["paris", "new york", "tokyo", "seoul"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=674ccb0379d9353d0feabab6e5df4fa0&units=metric&lang=kr`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("weather data : ", data);
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=674ccb0379d9353d0feabab6e5df4fa0&units=metric&lang=kr";`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("weather data : ", data);
    setWeather(data);
    setLoading(false);
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === null) {
      getCurrentLocation();
    } else {
      getWeatherByCity(city);
    }
  }, [city]);

  return (
    <div className="App">
      {loading ? (
        <div className="container">
          <ClipLoader color="aqua" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      )}
    </div>
  );
}

export default App;
