const express = require("express");

const TagsRoutes = express.Router();
const TagsController = require("../controller/manageTags");
const tagsController = require("../controller/manageTags");
const validator = require("../middleware/validator");

TagsRoutes.post("/addTag", validator.addTagValidation(), validator.validate, TagsController.addTag);
TagsRoutes.get("/getalltags", tagsController.getAllTags);
TagsRoutes.delete("/deletetag/:id", validator.deleteTagValidation(), validator.validate, TagsController.deleteTag);

module.exports = TagsRoutes;
