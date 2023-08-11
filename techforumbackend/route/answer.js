const express = require("express");

const answerRoutes = express.Router();
const answerController = require("../controller/answer");
const auth = require("../middleware/auth");
const validator = require("../middleware/validator");

answerRoutes.post("/answer", validator.postAnswerValidation(), validator.validate, auth.auth, answerController.addAnswer);
answerRoutes.get("/answer/:questionId", validator.getAnswerByIdValidation(), validator.validate, answerController.getAnswerByquestionId);
answerRoutes.patch("/answer/:id", validator.updateAnswerValidation(), validator.validate, auth.auth, answerController.editAnswer);
answerRoutes.delete("/answer/:id", validator.deleteAnswerValidation(), validator.validate, auth.auth, answerController.deleteAnswer);
answerRoutes.post("/upvote/:id", auth.auth, answerController.Upvote);
answerRoutes.post("/downvote/:id", auth.auth, answerController.Downvote);
answerRoutes.get("/upvote/:id", auth.auth, answerController.checkup);
answerRoutes.get("/downvote/:id", auth.auth, answerController.checkdown);

module.exports = answerRoutes;
