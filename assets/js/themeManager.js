// ==================================================
// Theme Manager – RK Weather App
// Light / Dark mode with persistence
// ==================================================

(function () {
  const STORAGE_KEY = "rk-weather-theme";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  /* -----------------------------------------------
     GET STORED THEME
  ------------------------------------------------ */
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  /* -----------------------------------------------
     APPLY THEME
  ------------------------------------------------ */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}

    updateToggleUI(theme);
  }

  /* -----------------------------------------------
     UPDATE TOGGLE UI
  ------------------------------------------------ */
  function updateToggleUI(theme) {
    if (!toggleBtn) return;

    toggleBtn.setAttribute("aria-pressed", theme === "dark");
    toggleBtn.setAttribute("data-theme", theme);
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
    // ✅ Light mode is default
    const savedTheme = getStoredTheme();
    const initialTheme = savedTheme || "light";

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
