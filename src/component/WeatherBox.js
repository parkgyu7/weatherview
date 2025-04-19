import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("weather box data :", weather);
  let Fahrenheit = (weather?.main.temp * 9) / 5 + 32;
  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp.toFixed(2)}°C / {Fahrenheit.toFixed(2)}°F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
