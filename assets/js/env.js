/**
 * Environment Configuration
 * Project: Weather Application
 * Maintainer: RK
 *
 * ⚠️ NOTE:
 * This API key is intentionally exposed for demo purposes
 * (GitHub Pages / client-side app).
 * Do NOT use this approach for production backends.
 */

(function () {
  const ENV = {
    WEATHER_API_KEY: "b659c45c2dee2a80251107f91a8a160c",
    WEATHER_API_BASE_URL: "https://api.openweathermap.org/data/2.5",
    WEATHER_ICON_URL: "https://openweathermap.org/img/wn"
  };

  /* ----------------------------------------
     BASIC VALIDATION
  ---------------------------------------- */
  if (!ENV.WEATHER_API_KEY) {
    console.error(
      "[ENV ERROR] Weather API key is missing. App will not function."
    );
  }

  /* ----------------------------------------
     FREEZE TO PREVENT RUNTIME MUTATION
  ---------------------------------------- */
  window.ENV = Object.freeze(ENV);
})();
