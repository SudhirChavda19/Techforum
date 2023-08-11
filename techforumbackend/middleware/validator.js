const {
    body, validationResult, check, query, param,
} = require("express-validator");

const signUpValidation = () => [
    // body.notEmpty()
    body("firstName").notEmpty().withMessage("firstname can't be empty").trim()
        .matches(/^[a-zA-Z]+$/)
        .withMessage("Invalid firstname, firstname must be string and white space not allow"),
    body("lastName").notEmpty().withMessage("lastName can't be empty").trim()
        .matches(/^[a-zA-Z]+$/)
        .withMessage("Invalid lastName, lastName must be string and white space not allow"),
    body("emailId").notEmpty().withMessage("emailid can't be empty").trim()
        .isEmail()
        .withMessage("enter valid emailid"),
    body("password").notEmpty().withMessage("password can't be empty").trim()
        .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[A-Za-z0-9!@#$%^&*]{6,}$/)
        .withMessage("Invalid password,password must have atleast one uppercase, one number,one special character and minimum 6 length"),
    body("confirmPassword").notEmpty().withMessage("password can't be empty").trim(),
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
const postAnswerValidation = () => [
    body("userId").notEmpty().withMessage("userId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid userId")
        .isLength({ max: 24 })
        .withMessage("Invalid userId"),
    body("questionId").notEmpty().withMessage("questionId can't be empty").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid questionId")
        .isLength({ max: 24 })
        .withMessage("Invalid questionId"),
    body("answer").notEmpty().withMessage("answer can't be empty").trim(),
];

const getAnswerByIdValidation = () => [
    param("questionId").notEmpty().withMessage("enter questionId in params").trim()
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
    body("answer").notEmpty().withMessage("answer can't be empty").trim(),
];
const deleteAnswerValidation = () => [
    param("id").notEmpty().withMessage("enter answerId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Invalid answerId in param")
        .isLength({ max: 24 })
        .withMessage("Invalid answerId in param"),
];

// const blogValidatePost = () => [
//     body("title").notEmpty().trim().withMessage("title can't be empty"),
//     body("content").notEmpty().trim().withMessage("content can't be empty"),
//     body("userId").notEmpty().trim().isLength(24)
//         .withMessage("must have the lenght of 24"),
// ];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    // console.log("Error")
    if (errors.isEmpty()) {
        return next();
    }
    // const extractedErrors = [];
    // errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(400).json({
        status: "Failed",
        error: errors.msg,
    });
};

module.exports = {
    signUpValidation,
    validate,
    signInValidation,
    searchValidation,
    questionValidate,
    getAnswerByIdValidation,
    updateAnswerValidation,
    postAnswerValidation,
    deleteAnswerValidation,

};
