const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// dbla catchkku use pannina error handling
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled rejection error`);
  server.close(() => {
    process.exit(1);
  });
});

// ithu error aagum because a is not defined so ithu uncaught exception aagum
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception error`);
  process.exit(1);
});

// console.log(a);
// a is not defined so uncaught exception aagum

