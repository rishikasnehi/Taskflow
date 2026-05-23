const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const mongoose = require("mongoose");

const morgan = require("morgan");


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
  console.log("MongoDB Connected");
})
.catch((error) => {
  console.log(error);
});


// ROUTES
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);


// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("TaskFlow API Running");
});


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});