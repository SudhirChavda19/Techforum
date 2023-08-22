const express = require("express");

const forgotpasswordRoutes = express.Router();
const forgotpasswordController = require("../controller/forgetPassword");
const validator = require("../middleware/validator");

forgotpasswordRoutes.post("/", (req, res, next)=>{
    console.log(req)
},forgotpasswordController.forgotPassword);
forgotpasswordRoutes.post("/reset-password", validator.resetPasswordValidation(), validator.validate, forgotpasswordController.resetPassword);

module.exports = forgotpasswordRoutes;
