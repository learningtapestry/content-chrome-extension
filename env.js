// Load .env values into process.env.
require('dotenv').config();

module.exports = {
  API_KEY: JSON.stringify(process.env.API_KEY),
  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL)
};
