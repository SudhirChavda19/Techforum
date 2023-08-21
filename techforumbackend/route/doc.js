const express = require("express");

const documentRoutes = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const documentController = require("../controller/doc");
const validator = require("../middleware/validator");

documentRoutes.get("/document", auth.auth, documentController.getDocument);

documentRoutes.get("/document/:id", validator.getDocByIdValidation(), validator.validate, auth.auth, documentController.getDocuments);

documentRoutes.post("/document", validator.postDocValidation(), validator.validate, multer, auth.auth, documentController.postDocument);

documentRoutes.delete("/document/:id", validator.deleteDocValidation(), validator.validate, auth.auth, documentController.deleteDocument);

// documentRoutes.get("/documentbyuser/:userId", auth.auth, documentController.getDocumentuser);

module.exports = documentRoutes;
