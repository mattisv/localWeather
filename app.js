window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let countryName = document.querySelector(".country-name");
  let weatherDesc = document.querySelector(".temperature-weather");
  let regionName = document.querySelector(".region-name");
  let weatherIcon = document.getElementById("weather-icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherapi.com/v1/current.json?key=e39db1e3433e4c708af122715211106&q=${lat},${long}&aqi=no`;

      fetch(api).then((response) => {
        return response.json().then((data) => {
          console.log(data);
          const { icon, text: weatherInfo } = data.current.condition;
          const { temp_c } = data.current;
          const { country, localtime, region, tz_id: TimeZone } = data.location;
          temperatureDegree.textContent = temp_c;
          temperatureDescription.textContent = localtime;
          locationTimezone.textContent = TimeZone;
          weatherDesc.textContent = weatherInfo;
          countryName.textContent = country;
          regionName.textContent = region;
          weatherIcon.src = icon;
        });
      });
    });
  }
});
