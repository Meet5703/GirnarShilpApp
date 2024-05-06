const userModel = require("../Models/userModels/userModel");
const { hashPassword, comparePassword } = require("../helpers/auth");
const JWT = require("jsonwebtoken");
const sendEmail = require("../helpers/mailer");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const registerController = async (req, res) => {
  try {
    //get data
    data = req.body;
    const { name, email, password } = data;

    //validation
    if (!name) {
      return res
        .status(400)
        .send({ message: "Please Enter Name", success: false });
    }
    if (!email) {
      return res
        .status(400)
        .send({ message: "Please Enter Email", success: false });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send({ message: "Please Enter Valid Password", success: false });
    }
    //existing user
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User Already Exists", success: false });
    }
    //hash password

    const hashedPassword = await hashPassword(password);
    //register user
    const user = new userModel({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    return res.status(200).send({
      success: true,
      message: "User Registered Successfully Please Login"
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "error in registration", success: false });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ message: "Please Enter Email and Password", success: false });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not Found", success: false });
    }
    //match password

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(200)
        .send({ message: "Invalid Password", success: false });
    }

    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      token,
      user
    });
  } catch (error) {
    return res.status(500).send({ message: "Error in login", success: false });
  }
};
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(404)
        .send({ message: "Please Enter Email", success: false });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not Found", success: false });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m"
    });
    return res.status(200).send({
      success: true,
      token
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in sending email", success: false });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password) {
      return res.status(400).send({
        message: "Password is required",
        success: false
      });
    }
    if (password.length < 6) {
      return res.status(400).send({
        message: "Password should be at least 6 characters",
        success: false
      });
    }

    const hashedPasswordReset = await hashPassword(password);

    // If the token is valid and not expired, update the user's password

    const user = await userModel.findOne({
      email: email
    });
    const data = await userModel.findByIdAndUpdate(user._id, {
      password: hashedPasswordReset
    });
    return res.status(200).send({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error("Error in resetting password:", error);
    return res
      .status(500)
      .send({ message: "Error in resetting password", success: false });
  }
};

// const resetPasswordControllerGet = async (req, res) => {
//   try {
//     const token = req.query.token;
//     const user = await userModel.findOne({ forgotPasswordToken: token });
//     if (!user) {
//       return res
//         .status(400)
//         .send({ message: "Invalid Token, User Not Found", success: false });
//     }

//     console.log("Token:", token);
//     console.log(token);
//     if (!token) {
//       return res.status(400).send({ message: "Invalid Token", success: false });
//     }
//     return res.render("enterpassword.ejs");
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "Error", success: false });
//   }
// };

module.exports = {
  // resetPasswordControllerGet,
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController
};
