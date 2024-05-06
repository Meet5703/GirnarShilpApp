const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/dbconnect");

dotenv.config();

connectDB();
//Rest Object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Port
const PORT = process.env.PORT || 8080;

//Routes
app.use("/api/v1/auth", require("./Routes/userRoutes"));

// Render the reset password page
// Inside your Express route handler
app.get("/success", (req, res) => {
  res.render("success");
});

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.white);
});
