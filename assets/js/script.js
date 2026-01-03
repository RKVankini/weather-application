// ==================================================
// Weather Application – Main Script (RK Version)
// Author: Rama Krishna Vankini
// ==================================================

/* --------------------------------------------------
   ENV CONFIG (from env.js)
-------------------------------------------------- */
const {
  WEATHER_API_KEY,
  WEATHER_API_BASE_URL,
  WEATHER_ICON_URL
} = window.ENV;

/* --------------------------------------------------
   DOM ELEMENTS
-------------------------------------------------- */
const searchInput = document.querySelector(".weather-component__search-bar");
const searchBtn = document.querySelector(".weather-component__button");
const micBtn = document.querySelector(".weather-component__button-microphone");

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("description");

const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

const weatherIconImg = document.querySelector(".weather-component__icn img");
const errorEl = document.getElementById("error-message");

/* --------------------------------------------------
   STATE
-------------------------------------------------- */
let isCelsius = true;
let currentCity = "Hyderabad";

/* --------------------------------------------------
   UTILITIES
-------------------------------------------------- */
function showError(message = "") {
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.style.display = message ? "block" : "none";
}

function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function convertTemp(tempC) {
  if (isCelsius) return `${Math.round(tempC)}°C`;
  return `${Math.round((tempC * 9) / 5 + 32)}°F`;
}

/* --------------------------------------------------
   API CALL
-------------------------------------------------- */
async function fetchWeather(city) {
  showError();

  if (!WEATHER_API_KEY) {
    showError("Missing API key");
    return;
  }

  try {
    const url = `${WEATHER_API_BASE_URL}/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${WEATHER_API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) throw new Error("City not found");
      if (res.status === 401) throw new Error("Invalid API key");
      throw new Error("Unable to fetch weather data");
    }

    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

/* --------------------------------------------------
   RENDER WEATHER
-------------------------------------------------- */
function renderWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  const { description, icon } = data.weather[0];
  const { sunrise, sunset } = data.sys;

  cityEl.textContent = name;
  tempEl.textContent = convertTemp(temp);
  descEl.textContent = description;

  humidityEl.textContent = `${humidity}%`;
  windEl.textContent = `${speed} m/s`;
  sunriseEl.textContent = formatTime(sunrise);
  sunsetEl.textContent = formatTime(sunset);

  weatherIconImg.src = `${WEATHER_ICON_URL}/${icon}@2x.png`;
  weatherIconImg.alt = description;
}

/* --------------------------------------------------
   EVENTS
-------------------------------------------------- */
searchBtn.addEventListener("click", () => {
  const value = searchInput.value.trim();
  if (!value) {
    showError("Please enter a city name");
    return;
  }
  currentCity = value;
  fetchWeather(currentCity);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

/* Unit Toggle (°C / °F) */
document.querySelector(".checkbox")?.addEventListener("change", (e) => {
  isCelsius = !e.target.checked;
  fetchWeather(currentCity);
});

/* --------------------------------------------------
   BACKGROUND IMAGE
-------------------------------------------------- */
const background = document.getElementById("background");

function setBackground() {
  if (!background) return;

  const size = window.innerWidth < 768 ? "720x1280" : "1600x900";
  background.style.backgroundImage = `url(https://source.unsplash.com/${size}/?weather,nature)`;
}

setBackground();

/* --------------------------------------------------
   INIT
-------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  fetchWeather(currentCity);
  searchInput.focus();
});
