const axios = require("axios");

module.exports = axios.create({
  baseURL: "https://harbor.medhub.com/functions/api"
});
