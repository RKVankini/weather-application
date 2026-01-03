// ==========================================
// RK Weather Application – Main Script
// Author: Rama Krishna Vankini
// ==========================================

import config from "../../config/config.js";

// -------------------- DOM ELEMENTS --------------------
const searchInput = document.querySelector(".weather-component__search-bar");
const searchButton = document.querySelector(
  ".weather-component__search button"
);
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");
const errorEl = document.getElementById("error-message");

// -------------------- STATE --------------------
let isCelsius = true;
let selectedCity = "Hyderabad";

// -------------------- HELPERS --------------------
function showError(message) {
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.hidden = !message;
}

function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function convertTemp(temp) {
  if (isCelsius) return `${Math.round(temp)}°C`;
  return `${Math.round((temp * 9) / 5 + 32)}°F`;
}

// -------------------- WEATHER LOGIC --------------------
async function fetchWeather(city) {
  showError("");
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${config.API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) throw new Error("City not found");
      if (res.status === 401) throw new Error("Invalid API key");
      throw new Error("Failed to fetch weather");
    }

    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

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
  windEl.textContent = `${speed} km/h`;
  sunriseEl.textContent = formatTime(sunrise);
  sunsetEl.textContent = formatTime(sunset);

  document.getElementById("icon").className = `fas ${mapIcon(icon)} fa-3x`;
}

// -------------------- ICON MAPPING --------------------
function mapIcon(code) {
  const icons = {
    "01d": "fa-sun",
    "01n": "fa-moon",
    "02d": "fa-cloud-sun",
    "02n": "fa-cloud-moon",
    "03d": "fa-cloud",
    "03n": "fa-cloud",
    "04d": "fa-cloud",
    "04n": "fa-cloud",
    "09d": "fa-cloud-showers-heavy",
    "09n": "fa-cloud-showers-heavy",
    "10d": "fa-cloud-sun-rain",
    "10n": "fa-cloud-moon-rain",
    "11d": "fa-bolt",
    "11n": "fa-bolt",
    "13d": "fa-snowflake",
    "13n": "fa-snowflake",
    "50d": "fa-smog",
    "50n": "fa-smog",
  };
  return icons[code] || "fa-cloud";
}

// -------------------- EVENTS --------------------
searchButton.addEventListener("click", () => {
  if (!searchInput.value.trim()) {
    showError("Please enter a city name");
    return;
  }
  selectedCity = searchInput.value.trim();
  fetchWeather(selectedCity);
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchButton.click();
});

// Temperature toggle
document.querySelector(".checkbox")?.addEventListener("change", function () {
  isCelsius = !this.checked;
  fetchWeather(selectedCity);
});

// -------------------- DEFAULT LOAD --------------------
document.addEventListener("DOMContentLoaded", () => {
  fetchWeather(selectedCity);
  searchInput.focus();
});

// -------------------- BACKGROUND (UNSPLASH ONLY) --------------------
const background = document.getElementById("background");
function setBackground() {
  const url = `https://source.unsplash.com/${
    window.innerWidth < 768 ? "720x1280" : "1600x900"
  }/?weather,nature`;
  background.style.backgroundImage = `url(${url})`;
}
setBackground();
