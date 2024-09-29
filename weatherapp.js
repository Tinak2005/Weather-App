console.log("Running");
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let d = new Date();
const getday = () => {
  let day = d.getDay();

  switch (day) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 5:
      day = "Saturday";
      break;
    default:
      day = "Not a Valid Day";
      break;
  }
  return day;
};
let input = document.querySelector("#city");
let currentCity = document.querySelector(".city-name");
let searchbutton = document.querySelector(".search");
let cityTemp = document.querySelector(".currentTemp");
let apiKey = "d7c60554e39t3a97f6ad15bdc4a5oaf2";
let timeBox = document.querySelector(".time");
let Currhumidity = document.querySelector(".humidity");
let CurrwindSpeed = document.querySelector(".windspeed");
// currentCity.innerHTML=city;

async function fetchweather(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data);
    let currentTemperature = data.temperature.current;
    let weatherIconUrl = data.condition.icon_url;
    let humidity = data.temperature.humidity;
    let windspeed = data.wind.speed;
    console.log("Humidity:", humidity);
    console.log("Wind Speed: ", windspeed);
    console.log(
      `Current temperature in ${city}:${weatherIconUrl} ${currentTemperature}°C`
    );
    cityTemp.innerHTML = `<img src="" id="emojisrc"> <span class="timevalue">${currentTemperature}°C</span>`;
    document.querySelector("#emojisrc").src = weatherIconUrl;
    Currhumidity.innerHTML = `Humidity:<strong>${humidity}%,</strong>`;
    CurrwindSpeed.innerHTML = `Wind:<strong>${windspeed}km/h</strong>`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function forecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data);
    console.log(data.daily);
    let forecastdata = data.daily;
    forecastdata.forEach((data) => {
      let mintemp = data.temperature.minimum;
      let maxtemp = data.temperature.maximum;
      let weatherIconUrl = data.condition.icon_url;
      console.log("Minimum Temp:", mintemp);
      console.log("Maximum Temp:", maxtemp);

      let forecastHTML = "";
      let days = ["Mon","Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
      days.forEach((day) => {
        forecastHTML += `<div class="day1">
                    <div class="day">${day}</div>
                    <div class="emoji"><img src="${weatherIconUrl}" alt="emoji"></div>
                    <div class="temp">
                        <span class="max"><strong>${maxtemp}°C</strong></span>
                        <span class="min">${mintemp}°C</span>
                    </div>
                </div>`;
        let forecastelement = document.querySelector(".tempinfo");
        forecastelement.innerHTML = forecastHTML;
      });
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayForecast() {
  //   let forecastHTML="";
  //   let days=["Tue","Wed","Thurs","Fri","Sat","Sun"]
  //   days.forEach(day => {
  //       forecastHTML+=`<div class="day1">
  //                     <div class="day">${day}</div>
  //                     <div class="emoji">🌧️</div>
  //                     <div class="temp">
  //                         <span class="max"><strong>29°</strong></span>
  //                         <span class="min">18°</span>
  //                     </div>
  //                 </div>`
  //   let forecastelement=document.querySelector(".tempinfo");
  //   forecastelement.innerHTML=forecastHTML;
  //  });
}
displayForecast();
searchbutton.addEventListener("click", () => {
  let city = input.value;
  currentCity.innerHTML = city;
  fetchweather(city);
  forecast(city);
  input.value = "";
});
setInterval(() => {
  let d = new Date();
  let t = d.toTimeString();
  let time = t.toString().replace("GMT+0530 (India Standard Time)", "");
  let day = getday();
  let currentTime = `${day} ${time}`;
  timeBox.innerHTML = currentTime;
}, 1000);
