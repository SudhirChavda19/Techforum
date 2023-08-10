const express = require("express");

const questionRouter = new express.Router();
const questionController = require("../controller/question");
const auth = require("../middleware/auth");

questionRouter.post("/question", auth.auth, questionController.createQuestion);

questionRouter.get("/question", questionController.readQuestions);

questionRouter.get("/quepagination", questionController.questionPagination);

questionRouter.get("/question/:id", questionController.readByIdQuestion);

questionRouter.get("/questionbyuser/:userId", questionController.readByIdUser);

questionRouter.patch("/question/:id", questionController.updateQuestion);

questionRouter.delete("/question/:id", questionController.deleteQuestion);

module.exports = questionRouter;
