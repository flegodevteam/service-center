export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // 500 is the default status code for server error

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV === "production") {
    let message = err.message;
    let error = new Error(message); // create a new error object

    // If the error is a mongoose validation error
    if (err.name === "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message); // get the error message from the error object and map it to an array of messages
      error = new Error(message); // create a new error object
      err.statusCode = 400; // 400 is the default status code for bad
    }

    // If the error is a mongoose cast error
    if (err.name === "CastError") {
      message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
      err.statusCode = 404; // 404 is the default status code for not found
    }

    // If the error is a mongoose duplicate key error
    if (err.code === 11000) {
      message = `Duplicate ${Object.keys(err.keyValue)} error`;
      error = new Error(message);
      err.statusCode = 400; // 400 is the default status code
    }

    // If the error is a json web token error (invalid token)
    if (err.name === "JsonWebTokenError") {
      message = `Json Web Token is invalid. Try again.`;
      error = new Error(message);
      err.statusCode = 400; // 400 is the default status code
    }

    // If the error is a json web token error (expired token)
    if (err.name === "TokenExpiredError") {
      message = `Json Web Token is expired. Try again.`;
      error = new Error(message);
      err.statusCode = 400; // 400 is the default status code
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
