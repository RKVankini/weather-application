// ==================================================
// Theme Manager – RK Weather App
// Handles Light / Dark mode with persistence
// ==================================================

(function () {
  const STORAGE_KEY = "rk-weather-theme";
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  /* -----------------------------------------------
     GET THEME
  ------------------------------------------------ */
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  /* -----------------------------------------------
     APPLY THEME
  ------------------------------------------------ */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}

    updateToggle(theme);
  }

  /* -----------------------------------------------
     TOGGLE UI
  ------------------------------------------------ */
  function updateToggle(theme) {
    if (!toggleBtn) return;

    toggleBtn.setAttribute("data-theme", theme);
    toggleBtn.setAttribute("aria-pressed", theme === "dark");
  }

  /* -----------------------------------------------
     TOGGLE HANDLER
  ------------------------------------------------ */
  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
  }

  /* -----------------------------------------------
     INIT
  ------------------------------------------------ */
  function init() {
    const savedTheme = getStoredTheme();
    const initialTheme = savedTheme || getSystemTheme();

    applyTheme(initialTheme);

    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleTheme);

      toggleBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTheme();
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
