const express = require("express");

const manageUsersRoutes = express.Router();
const manageUsersController = require("../controller/manageUser");
const validator = require("../middleware/validator");

manageUsersRoutes.get("/getusers", manageUsersController.getAllUsers);
manageUsersRoutes.delete("/deleteuser/:id", validator.deleteUserValidation(), validator.validate, manageUsersController.deleteUser);

module.exports = manageUsersRoutes;
