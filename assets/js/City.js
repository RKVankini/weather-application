/**
 * City List for Weather App
 * Optimized for Autocomplete & Search
 * Maintained by: RK
 */

const RAW_CITIES = [
  /* =========================
     🇮🇳 INDIA
  ========================== */
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Lucknow",
  "Kanpur",
  "Patna",
  "Ranchi",
  "Bhubaneswar",
  "Visakhapatnam",
  "Vijayawada",
  "Guntur",
  "Warangal",
  "Karimnagar",
  "Nizamabad",
  "Khammam",
  "Kadapa",
  "Kurnool",
  "Tirupati",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Erode",
  "Kochi",
  "Thiruvananthapuram",
  "Thrissur",
  "Kozhikode",

  /* =========================
     🌍 INTERNATIONAL
  ========================== */
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Washington, D.C.",
  "Toronto",
  "Vancouver",
  "London",
  "Manchester",
  "Paris",
  "Berlin",
  "Rome",
  "Madrid",
  "Amsterdam",
  "Zurich",
  "Vienna",
  "Dubai",
  "Abu Dhabi",
  "Riyadh",
  "Doha",
  "Tokyo",
  "Osaka",
  "Seoul",
  "Beijing",
  "Shanghai",
  "Hong Kong",
  "Singapore",
  "Bangkok",
  "Jakarta",
  "Kuala Lumpur",
  "Sydney",
  "Melbourne",
  "Auckland",
  "Cape Town",
  "Johannesburg",
  "Nairobi",
  "Cairo",
  "Istanbul",
  "Moscow",
  "São Paulo",
  "Buenos Aires",
  "Mexico City"
];

/* --------------------------------------------------
   NORMALIZATION
-------------------------------------------------- */

const normalize = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

/* --------------------------------------------------
   DATA STRUCTURES
-------------------------------------------------- */

// Remove duplicates safely
const UNIQUE_CITIES = [...new Set(RAW_CITIES)];

// Normalized index for fast search
const CITY_INDEX = UNIQUE_CITIES.map(city => ({
  original: city,
  normalized: normalize(city)
}));

/* --------------------------------------------------
   PUBLIC HELPERS
-------------------------------------------------- */

/**
 * Search cities for autocomplete
 * @param {string} query
 * @param {number} limit
 */
export function searchCities(query = "", limit = 10) {
  if (!query) return UNIQUE_CITIES.slice(0, limit);

  const q = normalize(query);

  return CITY_INDEX
    .filter(city => city.normalized.includes(q))
    .slice(0, limit)
    .map(city => city.original);
}

/**
 * Validate city exists in our dataset
 */
export function isKnownCity(cityName) {
  return CITY_INDEX.some(
    city => city.normalized === normalize(cityName)
  );
}

/**
 * Get full city list (read-only)
 */
export const CityList = Object.freeze(UNIQUE_CITIES);

export default CityList;
