const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController
  // resetPasswordControllerGet
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgotpassword", forgotPasswordController);
router.post("/resetpassword", resetPasswordController);

module.exports = router;
