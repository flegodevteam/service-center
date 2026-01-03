import dotenv from "dotenv";
dotenv.config();

import app from "../app.js";
import serverless from "serverless-http";

// Add basic logging for debugging
console.log("API handler initialized");

// Handle serverless environment
const handler = serverless(app, {
  binary: ['application/pdf', 'image/*'],
  request: (request, event, context) => {
    console.log("Request received:", request.method, request.url);
    return request;
  },
  response: (response, event, context) => {
    console.log("Response sent:", response.statusCode);
    return response;
  }
});

// Add error handling
const wrappedHandler = async (event, context) => {
  try {
    console.log("Handler called with event:", event.httpMethod, event.path);
    const result = await handler(event, context);
    console.log("Handler completed successfully");
    return result;
  } catch (error) {
    console.error("Handler error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      }
    };
  }
};

export default wrappedHandler;
