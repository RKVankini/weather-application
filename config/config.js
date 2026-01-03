// ==================================================
// Application Configuration – RK Weather App
// Reads values from window.ENV (env.js)
// ==================================================

window.APP_CONFIG = {
  WEATHER_API_KEY: window.ENV?.WEATHER_API_KEY || "",
  WEATHER_API_BASE_URL: "https://api.openweathermap.org/data/2.5",
  WEATHER_ICON_URL: "https://openweathermap.org/img/wn",

  // Optional (future use)
  AIR_QUALITY_API_KEY: window.ENV?.AIR_QUALITY_API_KEY || null
};
