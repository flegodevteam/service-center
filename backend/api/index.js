const dotenv = require("dotenv");
dotenv.config();

const app = require("../app.js");
const serverless = require("serverless-http");

module.exports = serverless(app);
