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
const getBlogByUserIdValidation = () => [
    param("userId").notEmpty().withMessage("enter answerId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid answerId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid answerId in param"),
];
// const getBlogTitleValidation = () => [
//     body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
//     check("upvotes").exists().withMessage("upvotes can't be null"),
//     body("downvotes").notEmpty().withMessage("userId can't be empty").trim()
//         .isLength({ min: 24 })
//         .withMessage("Invalid userId")
//         .isLength({ max: 24 })
//         .withMessage("Invalid userId"),
// ];
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
    body("emailId").notEmpty().trim().isEmail()
        .withMessage("enter valid email address"),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("password must be atleast 6 character long"),
];

const searchValidation = () => [
    query("tags").notEmpty().withMessage("enter the tag"),
];

const questionValidate = () => [
    body("userId").notEmpty().isLength(24).withMessage("userId must have length of 24"),
    body("question").notEmpty().trim(),
    body("tags").trim(),
];

// const blogValidatePost = () => [
//     body("title").notEmpty().trim().withMessage("title can't be empty"),
//     body("content").notEmpty().trim().withMessage("content can't be empty"),
//     body("userId").notEmpty().trim().isLength(24)
//         .withMessage("must have the lenght of 24"),
// ];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    // const extractedErrors = [];
    errors.array().filter((err) => err);
    console.log("-------", errors.errors);
    return res.status(400).json({
        status: "Failed",
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
    getBlogByUserIdValidation,
    postBlogValidation,
    deleteBlogValidation,
    updateBlogValidation,
    signUpValidation,
    validate,
    signInValidation,
    searchValidation,
    questionValidate,

};
