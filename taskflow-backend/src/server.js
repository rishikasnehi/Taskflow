const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const mongoose = require("mongoose");

const morgan = require("morgan");


// IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");

const projectRoutes = require("./routes/projectRoutes");

const taskRoutes = require("./routes/taskRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");


// IMPORT MIDDLEWARE
const errorHandler = require("./middleware/errorMiddleware");


// CONFIG
dotenv.config();


// APP
const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected Successfully");
})
.catch((error) => {
  console.log(error);
});


// API ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/dashboard", dashboardRoutes);


// DEFAULT ROUTE
app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "TaskFlow API Running Successfully",
  });

});


// ERROR HANDLER
app.use(errorHandler);


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});