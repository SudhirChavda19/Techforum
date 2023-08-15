const express = require("express");

const questionRouter = new express.Router();
const questionController = require("../controller/question");
const auth = require("../middleware/auth");
const validator = require("../middleware/validator");

questionRouter.post("/question", validator.postQuestionValidation(), validator.validate, auth.auth, questionController.createQuestion);

questionRouter.get("/question", questionController.readQuestions);

questionRouter.get("/quepagination", validator.quePaginationValidation(), validator.validate, questionController.questionPagination);

questionRouter.get("/question/:id", validator.getQuestionByIdValidation(), validator.validate, questionController.readByIdQuestion);

questionRouter.get("/questionbyuser/:userId", validator.getByUserIdValidation(), validator.validate, questionController.readByIdUser);

questionRouter.patch("/question/:id", validator.updateQuestionValidation(), validator.validate, questionController.updateQuestion);

questionRouter.delete("/question/:id", validator.deleteQuestionValidation(), validator.validate, questionController.deleteQuestion);

module.exports = questionRouter;
