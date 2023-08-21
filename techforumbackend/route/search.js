const express = require("express");

const searchRouter = new express.Router();
const searchController = require("../controller/search");
const validator = require("../middleware/validator");

searchRouter.get("/search", validator.searchValidation(), validator.validate, searchController.searchQuestion);

module.exports = searchRouter;
