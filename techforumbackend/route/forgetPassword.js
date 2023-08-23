const express = require("express");

const forgotpasswordRoutes = express.Router();
const forgotpasswordController = require("../controller/forgetPassword");
const validator = require("../middleware/validator");

forgotpasswordRoutes.post("/", validator.forgotPasswordValidation(), validator.validate, forgotpasswordController.forgotPassword);
forgotpasswordRoutes.post("/reset-password", validator.resetPasswordValidation(), validator.validate, forgotpasswordController.resetPassword);

module.exports = forgotpasswordRoutes;
