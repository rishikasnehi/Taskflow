const errorHandler = (err, req, res, next) => {

  console.log(err);

  let statusCode = res.statusCode === 200
    ? 500
    : res.statusCode;

  let message = err.message;

  // MONGOOSE BAD OBJECT ID
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  // MONGOOSE DUPLICATE KEY
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // MONGOOSE VALIDATION ERROR
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack,
  });
};

module.exports = errorHandler;