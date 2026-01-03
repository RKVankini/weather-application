# 🌦️ RK Weather Dashboard

A clean and lightweight **Weather Dashboard** built using **JavaScript**, **HTML**, and **CSS**, powered by the **OpenWeather API**.

This project focuses on simplicity, clarity, and a smooth user experience while delivering real-time weather information.

---

## 🚀 Live Demo  

🔗 **Live Application:**  
https://rkvankini.github.io/weather-application/

> Hosted using GitHub Pages

---

## 🌟 Features

✅ Real-time weather data using OpenWeather API  
✅ Search weather by city name  
✅ Displays temperature, humidity, and wind speed  
✅ Dynamic weather conditions  
✅ Light / Dark mode toggle  
✅ Persistent theme preference (localStorage)  
✅ Responsive design (desktop & mobile)  

---

## 🧩 Tech Stack

- **HTML5** – Structure and layout  
- **CSS3** – Styling and theming  
- **JavaScript (ES6)** – Logic, API integration, DOM manipulation  
- **OpenWeather API** – Weather data provider  

---

## 📁 Project Structure (High Level)

weather-application/
├── assets/
│ ├── css/
│ ├── compiled-css/
│ ├── icons/
│ └── images/
├── fonts/
│ └── icomoon/
├── js/
│ ├── env.js
│ ├── script.js
│ ├── themeManager.js
│ └── security.js
├── config/
│ └── config.js
├── index.html
└── README.md


---

## 🔐 Configuration

This is a **client-side application**.

API configuration is handled via `env.js`:

```js

window.ENV = {
  OPEN_WEATHER_API_KEY: "YOUR_API_KEY"
};

Note: API keys in frontend apps are visible by design.

🛠️ Design Decisions
Removed unused backend, build, and SCSS tooling

No bundler or framework — runs directly in the browser

Optimized for GitHub Pages deployment

Focused on maintainability and clarity

📌 Future Enhancements (Planned)
Multi-language support (i18n)
Extended forecast
Air quality data
UI enhancements