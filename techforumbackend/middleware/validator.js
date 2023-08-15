const {
    body, validationResult, check, query, param,
} = require("express-validator");

const postAnswerValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("userId").exists().withMessage("userId can't be null"),
    body("userId").notEmpty().withMessage("userId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId")
        .isLength({ max: 24 })
        .withMessage("Invalid userId"),
    check("questionId").exists().withMessage("questionId can't be null"),
    body("questionId").notEmpty().withMessage("questionId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid questionId")
        .isLength({ max: 24 })
        .withMessage("Invalid questionId"),
    check("answer").exists().withMessage("answer can't be null"),
    body("answer").notEmpty().withMessage("answer can't be empty").trim(),
];

const getAnswerByIdValidation = () => [
    // param().custom((value, { req }) => req.params === undefined).withMessage("enter questionId in params"),
    param("questionId").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid questionId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid questionId in param"),
];
const updateAnswerValidation = () => [
    param("id").notEmpty().withMessage("enter answerId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid answerId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid answerId in param"),
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("answer").exists().withMessage("answer can't be null"),
    body("answer").notEmpty().withMessage("answer can't be empty").trim(),
];
const deleteAnswerValidation = () => [
    param("id").notEmpty().withMessage("enter answerId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid answerId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid answerId in param"),
];
const upvoteValidation = () => [
    param("id").notEmpty().withMessage("enter answerId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid answerId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid answerId in param"),
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("upvotes").exists().withMessage("upvotes can't be null"),
    body("upvotes").notEmpty().withMessage("upvotes can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId in upvotes")
        .isLength({ max: 24 })
        .withMessage("Invalid userId in upvotes"),
];
const downvoteValidation = () => [
    param("id").notEmpty().withMessage("enter answerId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid answerId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid answerId in param"),
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("downvotes").exists().withMessage("downvotes can't be null"),
    body("downvotes").notEmpty().withMessage("downvotes can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId in downvotes")
        .isLength({ max: 24 })
        .withMessage("Invalid userId in downvotes"),
];

const getBlogValidation = () => [
    query("pageNumber").notEmpty().withMessage("enter pageNumber in query").trim(),
    query("pageSize").notEmpty().withMessage("enter pageSize in query").trim(),
];
const getBlogByIdValidation = () => [
    param("id").notEmpty().withMessage("enter answerId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid answerId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid answerId in param"),
];
const postBlogValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("userId").exists().withMessage("userId can't be null"),
    body("userId").notEmpty().withMessage("userId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId")
        .isLength({ max: 24 })
        .withMessage("Invalid userId"),
    check("title").exists().withMessage("title can't be null"),
    body("title").notEmpty().withMessage("title can't be empty").trim(),
    check("content").exists().withMessage("content can't be null"),
    body("content").notEmpty().withMessage("content can't be empty").trim(),
];
const deleteBlogValidation = () => [
    param("id").notEmpty().withMessage("enter blogId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid blogId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid blogId in param"),
];
const updateBlogValidation = () => [
    param("id").notEmpty().withMessage("enter blogId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid blogId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid blogId in param"),
];

const postQuestionValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("userId").exists().withMessage("userId can't be null"),
    body("userId").notEmpty().withMessage("userId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId")
        .isLength({ max: 24 })
        .withMessage("Invalid userId"),
    check("question").exists().withMessage("question can't be null"),
    body("question").trim().notEmpty().withMessage("question can't be empty"),
    // body("questionDescribe").custom((value, { req }) => req.body.questionDescribe !== undefined).trim()
    //     .withMessage("questionDescribe can't be empty"),
];
const quePaginationValidation = () => [
    query("page").notEmpty().withMessage("enter page in query").trim(),
    query("limit").notEmpty().withMessage("enter limit in query").trim(),
];
const getQuestionByIdValidation = () => [
    param("id").notEmpty().withMessage("enter questionId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid questionId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid questionId in param"),
];
const updateQuestionValidation = () => [
    param("id").notEmpty().withMessage("enter questionId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid questionId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid questionId in param"),
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
];
const deleteQuestionValidation = () => [
    param("id").notEmpty().withMessage("enter questionId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid questionId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid questionId in param"),
];

const bookmarkValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("userId").exists().withMessage("userId can't be null"),
    body("userId").notEmpty().withMessage("userId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId")
        .isLength({ max: 24 })
        .withMessage("Invalid userId"),
    check("questionId").exists().withMessage("questionId can't be null"),
    body("questionId").notEmpty().withMessage("questionId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid questionId")
        .isLength({ max: 24 })
        .withMessage("Invalid questionId"),
];

const postDocValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("userId").exists().withMessage("userId can't be null"),
    body("userId").notEmpty().withMessage("userId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId")
        .isLength({ max: 24 })
        .withMessage("Invalid userId"),
];
const getDocByIdValidation = () => [
    param("id").notEmpty().withMessage("enter documentId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid documentId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid documentId in param"),
];
const deleteDocValidation = () => [
    param("id").notEmpty().withMessage("enter documentId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid documentId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid documentId in param"),
];

const getByUserIdValidation = () => [
    param("userId").notEmpty().withMessage("enter userId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid userId in param"),
];

const forgotPasswordValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("emailId").exists().withMessage("emailId can't be null"),
    body("emailId").notEmpty().withMessage("emailid can't be empty").trim()
        .isEmail()
        .withMessage("enter valid emailid"),
];
const resetPasswordValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("newPassword").exists().withMessage("newPassword can't be null"),
    body("newPassword").notEmpty().withMessage("newPassword can't be empty").trim()
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[A-Za-z0-9!@#$%^&*]{6,}$/)
        .withMessage("Invalid newPassword, newPassword must have atleast one uppercase, one number,one special character and minimum 6 length"),
    check("confirmPassword").exists().withMessage("confirmPassword can't be null"),
    body("confirmPassword").notEmpty().withMessage("confirmPassword can't be empty").trim(),
    check("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Password not matched"),
];

const signUpValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("firstName").exists().withMessage("firstname can't be null"),
    body("firstName")
        .trim().notEmpty()
        .withMessage("firstname can't be empty")
        .matches(/^[a-zA-Z]+$/)
        .withMessage("Invalid firstname, firstname must be string and white space not allow"),
    check("lastName").exists().withMessage("lastName can't be null"),
    body("lastName").notEmpty().withMessage("lastName can't be empty").trim()
        .matches(/^[a-zA-Z]+$/)
        .withMessage("Invalid lastName, lastName must be string and white space not allow"),
    check("emailId").exists().withMessage("emailId can't be null"),
    body("emailId").notEmpty().withMessage("emailid can't be empty").trim()
        .isEmail()
        .withMessage("enter valid emailid"),
    check("password").exists().withMessage("password can't be null"),
    body("password").notEmpty().withMessage("password can't be empty").trim()
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[A-Za-z0-9!@#$%^&*]{6,}$/)
        .withMessage("Invalid password,password must have atleast one uppercase, one number,one special character and minimum 6 length"),
    check("confirmPassword").exists().withMessage("confirmPassword can't be null"),
    body("confirmPassword").notEmpty().withMessage("confirmPassword can't be empty").trim(),
    check("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Password not matched"),
];

const signInValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("emailId").exists().withMessage("emailId can't be null"),
    body("emailId").trim().notEmpty().withMessage("emailId can't be empty").isEmail()
        .withMessage("enter valid email address"),
    check("password").exists().withMessage("password can't be null"),
    body("password").notEmpty().withMessage("password can't be empty").isLength({ min: 6 }).withMessage("password must be atleast 6 character long"),
];

const searchValidation = () => [
    query("question").notEmpty().withMessage("enter the question in query"),
];

const deleteUserValidation = () => [
    param("id").notEmpty().withMessage("enter userId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid userId in param"),
];

const addTagValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("name").exists().withMessage("name can't be null"),
    body("name").trim().notEmpty().withMessage("name can't be empty"),
];
const deleteTagValidation = () => [
    param("id").notEmpty().withMessage("enter tagId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid tagId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid tagId in param"),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    // const extractedErrors = [];
    errors.array().filter((err) => err);
    return res.status(400).json({
        status: "Fail",
        error: errors.errors[0].msg,
    });
};

module.exports = {
    getAnswerByIdValidation,
    updateAnswerValidation,
    postAnswerValidation,
    deleteAnswerValidation,
    upvoteValidation,
    downvoteValidation,
    getBlogValidation,
    getBlogByIdValidation,
    postBlogValidation,
    deleteBlogValidation,
    updateBlogValidation,
    postQuestionValidation,
    quePaginationValidation,
    getQuestionByIdValidation,
    updateQuestionValidation,
    deleteQuestionValidation,
    bookmarkValidation,
    postDocValidation,
    getDocByIdValidation,
    deleteDocValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    getByUserIdValidation,
    signUpValidation,
    validate,
    signInValidation,
    searchValidation,
    deleteUserValidation,
    addTagValidation,
    deleteTagValidation,
};
