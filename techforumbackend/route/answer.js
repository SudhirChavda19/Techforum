const express = require("express");

const answerRoutes = express.Router();
const answerController = require("../controller/answer");
// const auth = require("../middleware/auth");

answerRoutes.post("/answer", answerController.addAnswer);
answerRoutes.get("/answer/:questionId", answerController.getAnswerByquestionId);
answerRoutes.patch("/answer/:id", answerController.editAnswer);
answerRoutes.delete("/answer/:id", answerController.deleteAnswer);
answerRoutes.post("/upvote/:id", answerController.Upvote);
answerRoutes.post("/downvote/:id", answerController.Downvote);
answerRoutes.get("/upvote/:id", answerController.checkup);
answerRoutes.get("/downvote/:id", answerController.checkdown);

module.exports = answerRoutes;
