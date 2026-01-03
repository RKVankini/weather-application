// ==================================================
// Security Utilities – RK Weather App
// Author: Rama Krishna Vankini
// Purpose: Basic client-side input safety & validation
// NOTE: This is NOT a security guarantee (client-side)
// ==================================================

window.Security = (() => {
  /* -----------------------------------------------
     SANITIZE USER INPUT
     - Prevent XSS via input field
     - Trim length
  ------------------------------------------------ */
  function sanitizeInput(input) {
    if (typeof input !== "string") return "";

    return input
      .replace(/[<>\"'&]/g, (char) => {
        const map = {
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "&": "&amp;"
        };
        return map[char];
      })
      .trim()
      .slice(0, 60); // limit city length
  }

  /* -----------------------------------------------
     VALIDATE CITY NAME
     - Letters, spaces, hyphens only
  ------------------------------------------------ */
  function isValidCity(city) {
    if (!city) return false;
    const regex = /^[a-zA-Z\s\-']{2,50}$/;
    return regex.test(city);
  }

  /* -----------------------------------------------
     SAFE URL CHECK (used for icons / backgrounds)
  ------------------------------------------------ */
  function isSecureUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:";
    } catch {
      return false;
    }
  }

  /* -----------------------------------------------
     PUBLIC API
  ------------------------------------------------ */
  return {
    sanitizeInput,
    isValidCity,
    isSecureUrl
  };
})();
