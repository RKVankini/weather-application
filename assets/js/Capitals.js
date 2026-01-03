/**
 * Capitals Database
 * Cleaned & Normalized
 * Author: RK
 */

const RAW_CAPITALS = [
  { country: "Afghanistan", capital: "Kabul" },
  { country: "Albania", capital: "Tirana" },
  { country: "Algeria", capital: "Algiers" },
  { country: "Australia", capital: "Canberra" },
  { country: "Austria", capital: "Vienna" },
  { country: "Bangladesh", capital: "Dhaka" },
  { country: "Belgium", capital: "Brussels" },
  { country: "Brazil", capital: "Brasília" },
  { country: "Canada", capital: "Ottawa" },
  { country: "China", capital: "Beijing" },
  { country: "France", capital: "Paris" },
  { country: "Germany", capital: "Berlin" },
  { country: "India", capital: "New Delhi" },
  { country: "Indonesia", capital: "Jakarta" },
  { country: "Italy", capital: "Rome" },
  { country: "Japan", capital: "Tokyo" },
  { country: "Mexico", capital: "Mexico City" },
  { country: "Netherlands", capital: "Amsterdam" },
  { country: "Russia", capital: "Moscow" },
  { country: "South Africa", capital: "Pretoria" },
  { country: "Spain", capital: "Madrid" },
  { country: "Sri Lanka", capital: "Sri Jayawardenepura Kotte" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States", capital: "Washington, D.C." }
];

/* --------------------------------------------------
   NORMALIZATION HELPERS
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

// Map for fast lookup
const COUNTRY_TO_CAPITAL = new Map();

// Reverse map (capital → country)
const CAPITAL_TO_COUNTRY = new Map();

RAW_CAPITALS.forEach(({ country, capital }) => {
  if (!country || !capital) return;

  COUNTRY_TO_CAPITAL.set(normalize(country), capital);
  CAPITAL_TO_COUNTRY.set(normalize(capital), country);
});

/* --------------------------------------------------
   PUBLIC API
-------------------------------------------------- */

/**
 * Get capital by country name
 */
export function getCapital(countryName) {
  return COUNTRY_TO_CAPITAL.get(normalize(countryName)) || null;
}

/**
 * Get country by capital name
 */
export function getCountry(capitalName) {
  return CAPITAL_TO_COUNTRY.get(normalize(capitalName)) || null;
}

/**
 * Search countries or capitals
 */
export function searchCapitals(query) {
  const q = normalize(query);

  return RAW_CAPITALS.filter(
    ({ country, capital }) =>
      normalize(country).includes(q) ||
      normalize(capital).includes(q)
  );
}

/**
 * Full clean list (readonly)
 */
export const CapitalsList = Object.freeze(RAW_CAPITALS);

export default CapitalsList;
