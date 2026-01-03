// // Secure configuration - Use build tools to inject env vars
// export default {
//   AIR_KEY: window.ENV?.AIR_QUALITY_API_KEY || "427f7ef80457a39a26407e17ef0d604339190901",
//   API_KEY: window.ENV?.WEATHER_API_KEY || "20a36f8e1152244bbbd9ac296d3640f2",
//   PEXELS_KEY: window.ENV?.PEXELS_API_KEY || "OOjKyciq4Sk0Kla7riLuR2j8C9FwThFzKIKIHrpq7c27KvrCul5rVxJj"
// }
// Configuration file (Customized by Rama Krishna Vankini)
// API keys are injected from env.js for frontend demo purposes

export default {
  API_KEY: window.ENV?.WEATHER_API_KEY
};
