const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = conn.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    // In serverless environment, don't throw error immediately
    // Let the application continue without DB connection
    if (process.env.NODE_ENV === 'production') {
      console.log("Continuing without database connection in production");
      return;
    }
    throw err;
  }
};

module.exports = connectDB;
