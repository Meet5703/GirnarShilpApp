const mongoose = require("mongoose");

const userData = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      trim: true,
      min: 6,
      max: 20
    },
    forgotPasswordToken: {
      type: String
    },
    forgotPasswordTokenExpiry: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userData);
