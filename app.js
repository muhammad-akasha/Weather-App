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
getCity.addEventListener("change", (e) => {  // Triggered when the value in the input field changes
  if (e.target.value === "") {  // Check if the input is empty
    alert("Please enter a city name");
  } else {
    cityName = e.target.value.trim(); // Trim whitespace from the input
  }
});

cityBtn.addEventListener("click", () => {  // Triggered when the button is clicked
  if (!cityName) {  // Check if cityName is empty
    alert("Please enter a city name");
  } else {
    showWeatherByCity(cityName);  // Call function to show weather by city name
  }
});


// function for get value from input and show those city weather.

function showWeatherByCity(city) {
  let capiCityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  const urls = [
    `https://api.openweathermap.org/data/2.5/weather?q=${capiCityName}&APPID=8fc39c8c9f8d64a0e4c6a57d68ba1caa`,
    `https://api.openweathermap.org/data/2.5/forecast?q=${capiCityName}&appid=8fc39c8c9f8d64a0e4c6a57d68ba1caa&units=metric`,
  ];

  Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
    .then((data) => {
      let weatherContainer = document.createElement("div");
      let forecastContainer = document.createElement("div");
      forecastContainer.classList.add("forecast-container");
      let weatherData = data[0];
      let forecast = data[1];

      if (weatherData.cod === 200 && forecast.cod === "200") {
        const {
          name,
          main: { temp, feels_like },
          sys: { country, sunrise, sunset }, weather : [{description : descrip , icon}]
        } = weatherData;  // get data by using destructuring for better readibility.
        let sunRiseSunSet = sunRiseandSetTime(sunrise, sunset);
        let currTemp = tempConvertor(temp);
        let realFeel = tempConvertor(feels_like);
        let weatherImage = weatherIcon(descrip, icon);

        let weatherHtml = `
          <div><h3> Date: ${currDate().date} Time: ${currDate().time}</h3></div>
          <div class="weather-container">
            <div class="child-one" style="width:330px">
              <h1>${name}, ${country}</h1>
              <h2>Temperature: <strong style="font-size:40px; color:azure">${currTemp}</strong></h2>
              <h2>Feels Like: ${realFeel}</h2>
              <h2>${descrip} <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${descrip}"></h2>
              <h2>Sunrise: ${sunRiseSunSet.sunRise}</h2>
              <h2>Sunset: ${sunRiseSunSet.sunSet}</h2>
            </div>
            <div class="child-two" style="width:250px">${weatherImage}</div>
          </div>
        `;

        for (let i = 1; i < forecast.list.length; i += 8) {
          let forecastItem = forecast.list[i];
          let day = formattedTime(forecastItem.dt).day;
          let time = formattedTime(forecastItem.dt).time;
          let fourDayTemp = forecastItem.main.temp;
          let fourDayDescrip = forecastItem.weather[0].description;
          let fourDayIcon = forecastItem.weather[0].icon;
          let fourDayAllIcons = weatherIcon(fourDayDescrip, fourDayIcon);

          // Create a new div for each day's forecast
          const dayDiv = document.createElement("div");
          dayDiv.classList.add("forecast-day"); // Add any necessary styling

          // Populate the div with forecast information
          dayDiv.innerHTML = `
            <h3>${day}</h3>
            <h3>${time}</h3>
            <h3>${fourDayAllIcons}</h3>
            <h3>${fourDayTemp} \xB0C</h3>
          `;

          forecastContainer.appendChild(dayDiv);
        }

        weatherBox.innerHTML = "";
        weatherContainer.innerHTML = weatherHtml;
        weatherContainer.appendChild(forecastContainer);
        weatherBox.appendChild(weatherContainer);

        footerPositioning();
        dayAndNightEffects()
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
  const urls = [
    `https://api.openweathermap.org/data/2.5/weather?q=${capiCityName}&APPID=8fc39c8c9f8d64a0e4c6a57d68ba1caa`,
    `https://api.openweathermap.org/data/2.5/forecast?q=${capiCityName}&appid=8fc39c8c9f8d64a0e4c6a57d68ba1caa&units=metric`,
  ];

  Promise.all(urls.map((url) => fetch(url).then((res) => res.json()))) // fetch two api at the same time
    .then((data) => {
      let weatherContainer = document.createElement("div");
      let forecastContainer = document.createElement("div");
      forecastContainer.classList.add("forecast-container");
      let weatherData = data[0];
      let forecast = data[1];

      if (weatherData.cod === 200 && forecast.cod === "200") {  // check that is both found or not
        const {
          name,
          main: { temp, feels_like },
          sys: { country, sunrise, sunset }, weather : [{description : descrip , icon}]
        } = weatherData;
        let sunRiseSunSet = sunRiseandSetTime(sunrise, sunset);
        let currTemp = tempConvertor(temp);
        let realFeel = tempConvertor(feels_like);
        let weatherImage = weatherIcon(descrip, icon);

        let weatherHtml = `
          <div><h3> Date: ${currDate().date} Time: ${currDate().time}</h3></div>
          <div class="weather-container">
            <div class="child-one" style="width:330px">
              <h1>${name}, ${country}</h1>
              <h2>Temperature: <strong style="font-size:40px; color:azure">${currTemp}</strong></h2>
              <h2>Feels Like: ${realFeel}</h2>
              <h2>${descrip} <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${descrip}"></h2>
              <h2>Sunrise: ${sunRiseSunSet.sunRise}</h2>
              <h2>Sunset: ${sunRiseSunSet.sunSet}</h2>
            </div>
            <div class="child-two" style="width:250px">${weatherImage}</div>
          </div>
        `;

        for (let i = 1; i < forecast.list.length; i += 8) {
          let forecastItem = forecast.list[i];
          let day = formattedTime(forecastItem.dt).day;
          let time = formattedTime(forecastItem.dt).time;
          let fourDayTemp = forecastItem.main.temp;
          let fourDayDescrip = forecastItem.weather[0].description;
          let fourDayIcon = forecastItem.weather[0].icon;
          let fourDayAllIcons = weatherIcon(fourDayDescrip, fourDayIcon);

          // Create a new div for each day's forecast
          const dayDiv = document.createElement("div");
          dayDiv.classList.add("forecast-day"); // Add any necessary styling

          // Populate the div with forecast information
          dayDiv.innerHTML = `
            <h3>${day}</h3>
            <h3>${time}</h3>
            <h3>${fourDayAllIcons}</h3>
            <h3>${fourDayTemp} \xB0C</h3>
          `;

          forecastContainer.appendChild(dayDiv);
        }

        weatherBox.innerHTML = "";
        weatherContainer.innerHTML = weatherHtml;
        weatherContainer.appendChild(forecastContainer);
        weatherBox.appendChild(weatherContainer);

        footerPositioning();
        dayAndNightEffects()
      } else {
        weatherBox.innerHTML = `City not found: ${data.message}`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      weatherBox.innerHTML = `An error occurred: ${error.message}`;
    });
}

// temp convertor function.

function tempConvertor(temp) {
  let tempCelcius = temp - 273.15;
  tempCelcius = Math.round(tempCelcius.toFixed(2));
  return tempCelcius + "\xB0C";
}

// function for get sunrise sunset time.

function sunRiseandSetTime(sunrise, sunset) {
  let sunSet = new Date(sunset * 1000);
  let sunRise = new Date(sunrise * 1000);

  return {
    sunRise: sunRise.toLocaleTimeString(),
    sunSet: sunSet.toLocaleTimeString(),
  };
}

function currDate() {
  const months = [  // month array
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
  let hour = date
    .getHours()
    .toString()
    .padStart(2, "0");
  let minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");

  let hour12 = hour % 12 || 12;
  let timePeriod = hour >= 12 ? "PM" : "AM";

  return {
    time: `${hour12} : ${minutes} : ${timePeriod} `,
    date: `  ${currDate} : ${months[month]} : ${year}`,
  };
}

function weatherIcon(description, icon) {
  if (
    description === "fog" ||
    description === "haze" ||
    description === "dust" ||
    description === "smoke"
  ) {
    return `<i class="fa-solid fa-smog"></i>`;
  } else if (description === "rain") {
    return `<i class="fa-solid fa-cloud-rain"></i>`;
  } else if (description === "thunderstorm") {
    return `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else if (description === "drizzle" || description.includes("rain")) {
    return `<i class="fa-solid fa-cloud-rain"></i>`;
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

function formattedTime(milliseconds) {
  const fourcastDate = new Date(milliseconds * 1000); // Convert seconds to milliseconds
  //   console.log(fourcastDate);

  let hour12 = fourcastDate.getHours() % 12 || 12;
  let timePeriod = hour12 >= 12 ? "PM" : "AM";
  let day = fourcastDate.getDay();
  let days_of_week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return {
    time: `${hour12} ${timePeriod}`,
    day: `${days_of_week[day]}`,
  };
}

// add function for set the footer positions.

function footerPositioning() {
  let footer = document.querySelector(".footer");
  let weatherBox = document.querySelector(".weather-box");
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

// add a day night image change function
 
function dayAndNightEffects() {
  let weatherContainer = document.querySelector(".weather-container");
  weatherContainer.style.backgroundColor = "transparent";
  weatherBox.style.border = "2px solid #f3f3f3";
  weatherBox.style.boxShadow = "rgb(18 2 255 / 20%) -6px -4px 24px, rgb(255 27 27 / 20%) 2px 4px 4px, rgb(173 133 133 / 20%) 4px 8px 8px, rgb(255 220 220 / 20%) 8px 16px 16px, rgb(0 0 0 / 20%) 16px 32px 32px"
  let hour = new Date().getHours();
  let isDayOrNight = hour >= 5 && hour <= 19;
  document.body.style.backgroundImage = isDayOrNight
    ? "url('./images/day.jpg')"
    : "url('./images/night.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

}