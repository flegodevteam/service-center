const dotenv = require("dotenv");
dotenv.config();

const app = require("../app.js");
const serverless = require("serverless-http");

// Handle serverless environment
const handler = serverless(app, {
  binary: ['application/pdf', 'image/*'],
  request: (request, event, context) => {
    // Add any request preprocessing here
    return request;
  },
  response: (response, event, context) => {
    // Add any response postprocessing here
    return response;
  }
});

module.exports = handler;
