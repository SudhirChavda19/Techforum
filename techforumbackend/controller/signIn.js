const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const UserRole = require("../model/userRole");
const logger = require("../log/logger");
require("dotenv").config();

module.exports = {
    /**
     * This function get data from req body to signin an user
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    signIn: async (req, res) => {
        try {
            const { emailId } = req.body;
            const { password } = req.body;
            const user = await User.findOne({ emailId });
            if (!user) {
                logger.log("error", "Incorrect Email or password");
                return res.status(400).json({
                    status: "Fail",
                    message: "Incorrect Email or password",
                });
            }

            const salt = process.env.SALT;
            const hashedPassword = crypto
                .pbkdf2Sync(password, salt, 1000, 64, "sha512")
                .toString("hex");

            if (hashedPassword === user.password) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                const expirationTime = new Date(Date.now() + 12 * 60 * 60 * 1000);

                // const cookieString = `jwt=${token}; HttpOnly;
                // Expires=${expirationTime.toUTCString()};SameSite=None; Secure; Path=/`;
                // res.setHeader("Set-Cookie", cookieString);

                logger.log("info", "Signed in successfully");
                return res.cookie("jwt", token, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    expires: expirationTime,
                }).status(200).json({
                    status: "Success",
                    message: "Signed in successfully",
                    data: {
                        _id: user._id,
                        role: user.userRole,
                        name: `${user.firstName} ${user.lastName}`,
                    },
                });
            }
            logger.log("error", "Incorrect Email or password");
            return res.status(400).json({
                status: "Fail",
                message: "Incorrect Email or password",
            });
        } catch (err) {
            logger.log("error", `Server Error: ${err}`);
            return res.status(500).json({
                status: "Fail",
                message: "Server Error",
            });
        }
    },

    /**
     * This function get data from req param to fetch user role from useid
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    userRole: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            const role = user.userRole;
            const userRole = await UserRole.findOne({ _id: role });
            logger.log("info", "user role get Successfully");
            return res.status(200).json({
                status: "Success",
                message: "user role get Successfully",
                userRole: userRole.roleName,
            });
        } catch (err) {
            if (err.name === "CastError" && err.kind === "ObjectId") {
                logger.log("error", "Invalid Id");
                return res.status(400).json({
                    status: "Fail",
                    message: "Invalid Id",
                });
            }
            logger.log("error", `Server Error: ${err}`);
            return res.status(500).json({
                status: "Fail",
                message: "Server Error",
            });
        }
    },
};
