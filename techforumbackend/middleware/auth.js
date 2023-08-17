const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require("../log/logger");

/**
     * This function check cookie from header and check if user is authenticated or not
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @param {Object} next executes the next middleware in the middleware stack
     * @returns {Object} server will return response in json object
     */
exports.auth = async (req, res, next) => {
    // const check = req.headers.cookie;
    // console.log(typeof check);
    // const token = check.slice(4, check.length);
    let token = req.headers.cookie;
    if (!token) {
        logger.log("error", "Need to Sign In");
        return res.status(401).json({
            status: "Fail",
            message: "Need to Sign In",
        });
    }
    try {
        token = token.slice(4, token.length);
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decode.userId;
    } catch (err) {
        logger.log("error", "You are not authorized");
        return res.status(401).json({
            status: "Fail",
            message: "You are not authorized",
        });
    }
    return next();
};
