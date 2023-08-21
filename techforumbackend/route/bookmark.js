const express = require("express");

const bookmarkRoutes = express.Router();
const bookmarkController = require("../controller/bookmark");
const auth = require("../middleware/auth");
const validator = require("../middleware/validator");

bookmarkRoutes.post("/bookmark", validator.bookmarkValidation(), validator.validate, auth.auth, bookmarkController.addBookmark);
bookmarkRoutes.get("/bookmark/:userId", validator.getByUserIdValidation(), validator.validate, auth.auth, bookmarkController.getBookmarkByUserId);
bookmarkRoutes.get("/managebookmark/:userId", validator.getByUserIdValidation(), validator.validate, auth.auth, bookmarkController.getmanageBookmarkById);
module.exports = bookmarkRoutes;
