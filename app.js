let weatherBox = document.querySelector(".weather-box");
let getCity = document.getElementById("city");
let cityBtn = document.getElementById("cityBtn");
let searchForm = document.querySelector("#searchform");
let APIkey = "8fc39c8c9f8d64a0e4c6a57d68ba1caa";
function searchBarShow() {
  if (!searchForm.className.includes("hide")) {
    searchForm.classList.add("hide");
  } else {
    searchForm.classList.remove("hide");
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
let cityName;
getCity.addEventListener("change", (e) => {
  if (e.target.value === "") {
    alert("Please enter a city name");
  } else {
    cityName = e.target.value.trim(); // Trim whitespace from input
  }
});

cityBtn.addEventListener("click", () => {
  if (!cityName) {
    alert("Please enter a city name");
  } else {
    showWeatherByCity(cityName);
  }
});
function showWeatherByCity(city) {
  let capiCityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${capiCityName}&APPID=8fc39c8c9f8d64a0e4c6a57d68ba1caa`
  )
    .then((res) => {
      return res.json(); // You need to return the promise from res.json() here
    })
    .then((data) => {
      let weatherContainer = document.createElement("div");
      if (data.cod === 200) {
        let weatherData = data;
        let weatherMain = weatherData.main;
        let weatherSys = weatherData.sys;
        let weatherCountry = weatherSys.country;
        let sunRiseSunSet = sunRiseandSetTime(
          weatherSys.sunrise,
          weatherSys.sunset
        );
        let cityName = weatherData.name;
        let currTemp = tempConvertor(weatherMain.temp);
        let realFeel = tempConvertor(weatherMain.feels_like);
        let description = weatherData.weather[0].description;
        let icon = weatherData.weather[0].icon;
        let weatherImage = weatherIcon(description, icon);
        weatherBox.innerHTML = "";
        weatherBox.appendChild(weatherContainer);
        // weatherContainer.classList.add("weather-container");
        let weatherHtml = `
        <div><h3> Date ${currDate().date} Time : ${currDate().time}</h3></div>
        <div class="weather-container">
        <div class="child-one" style="width:330px">
        <h1> ${cityName} ${weatherCountry} </h1>
        <h2> Temperature <strong style="font-size:40px; color:azure"> ${currTemp} </strong> </h2>
        <h2> Feel Like ${realFeel} </h2>
        <h2> ${description}<img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}"> </h2>
        <h2> Sunrise ${sunRiseSunSet.sunRise}</h2>
        <h2> Sunset ${sunRiseSunSet.sunSet}</h2>
        </div>
        <div class="child-two" style="width:250px"> ${weatherImage} </div>
        </div>
        `;
        weatherContainer.innerHTML = weatherHtml;
        footerPositioning();
      } else {
        weatherBox.innerHTML = `City not found: ${data.message}`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      weatherBox.innerHTML = `An error occurred: ${error.message}`;
    });
}
function showWeatherByDropdown(city) {
  let capiCityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${capiCityName},PK&APPID=8fc39c8c9f8d64a0e4c6a57d68ba1caa`
  )
    .then((res) => {
      return res.json(); // You need to return the promise from res.json() here
    })
    .then((data) => {
      let weatherContainer = document.createElement("div");
      if (data.cod === 200) {
        let weatherData = data;
        let weatherMain = weatherData.main;
        let weatherSys = weatherData.sys;
        let weatherCountry = weatherSys.country;
        let sunRiseSunSet = sunRiseandSetTime(
          weatherSys.sunrise,
          weatherSys.sunset
        );
        let cityName = weatherData.name;
        let currTemp = tempConvertor(weatherMain.temp);
        let realFeel = tempConvertor(weatherMain.feels_like);
        let description = weatherData.weather[0].description;
        let icon = weatherData.weather[0].icon;
        let weatherImage = weatherIcon(description, icon);
        weatherBox.innerHTML = "";
        weatherBox.appendChild(weatherContainer);
        let weatherHtml = `
        <div><h3> Date ${currDate().date} Time : ${currDate().time}</h3></div>
        <div class="weather-container">
        <div class="child-one" style="width:330px">
        <h1> ${cityName} ${weatherCountry} </h1>
        <h2> Temperature <strong style="font-size:40px; color:azure"> ${currTemp} </strong> </h2>
        <h2> Feel Like ${realFeel} </h2>
        <h2> ${description}<img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}"> </h2>
        <h2> Sunrise ${sunRiseSunSet.sunRise}</h2>
        <h2> Sunset ${sunRiseSunSet.sunSet}</h2>
        </div>
        <div class="child-two" style="width:250px"> ${weatherImage} </div>
        </div>
        `;
        weatherContainer.innerHTML = weatherHtml;
        footerPositioning();
      } else {
        weatherBox.innerHTML = `City not found: ${data.message}`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      weatherBox.innerHTML = `An error occurred: ${error.message}`;
    });
}

function tempConvertor(temp) {
  let tempCelcius = temp - 273.15;
  tempCelcius = Math.round(tempCelcius.toFixed(2));
  return tempCelcius + "\xB0C";
}

function sunRiseandSetTime(sunrise, sunset) {
  let sunSet = new Date(sunset * 1000);
  let sunRise = new Date(sunrise * 1000);

  return {
    sunRise: sunRise.toLocaleTimeString(),
    sunSet: sunSet.toLocaleTimeString(),
  };
}

function currDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();
  let currDate = date.getDate();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDay();
  let hour = date
    .getHours()
    .toString()
    .padStart(2, "0");
  let minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
 
  let hour12 = hour % 12 || 12;
  let timePeriod = hour > 12 ? "AM" : "PM";

  return {
    time: `${hour12} : ${minutes} : ${timePeriod} `,
    date: `  ${currDate} : ${months[month]} : ${year}`,
  };
}

function weatherIcon(description, icon) {
  if (
    description === "fog" ||
    description === "haze" ||
    description === "dust"
  ) {
    return `<i class="fa-solid fa-smog"></i>`;
  } else if (description === "rain") {
    return `<i class="fa-solid fa-cloud-rain"></i>`;
  } else if (description === "thunderstorm") {
    return `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else if (
    description === "scattered clouds" ||
    description.includes("clouds")
  ) {
    return `<i class="fa-solid fa-cloud"></i>`;
  } else if (description === "clear sky" && icon.includes("d")) {
    return `<i class="fa-solid fa-sun"></i>`;
  } else if (description === "clear sky" && icon.includes("n")) {
    return `<i class="fa-solid fa-moon"></i>`;
  } else if (description === "snow") {
    return `<i class="fa-solid fa-snowflake"></i>`;
  } else {
    if (icon.includes("d")) {
      return `<i class="fa-solid fa-cloud-sun"></i>`;
    } else {
      return `<i class="fa-solid fa-cloud-moon"></i>`;
    }
  }
}

// let yourCity = "Islamabad";
// fetch(
//   `https://api.openweathermap.org/data/2.5/forecast?q=${yourCity}&lat=44.34&lon=10.99&appid=8fc39c8c9f8d64a0e4c6a57d68ba1caa`
// )
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     const days = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ];
//     for (let show of data.list) {
//       let weatherForcast = show;
//       console.log(weatherForcast);
//     }
//   })
//   .catch((error) => {
//     console.error("Error fetching weather data:", error);
//   });

function footerPositioning() {
  let footer = document.querySelector(".footer");
  let weatherBox = document.querySelector(".weather-box");
  console.log(footer, weatherBox);
  if (weatherBox.innerHTML === "") {
    // Add the 'fixed' class if empty
    footer.classList.add("fixed");
    footer.classList.remove("relative");
  } else {
    // Add the 'relative' class if not empty
    footer.classList.add("relative");
    footer.classList.remove("fixed");
  }
}

