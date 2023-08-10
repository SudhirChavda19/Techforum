const express = require("express");

const router = express.Router();
const signinController = require("../controller/signUp");
const validator = require("../middleware/validator");

router.post("/signup", validator.signUpValidation(), validator.validate, signinController.signUp);

module.exports = router;
