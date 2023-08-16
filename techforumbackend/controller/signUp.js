/* eslint-disable import/no-extraneous-dependencies */
const crypto = require("crypto");
const User = require("../model/user");
require("dotenv").config();

module.exports = {
    /**
     * This function accept data and create a new user or signup an new user
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object}
     */
    signUp: async (req, res) => {
        const {
            firstName,
            lastName,
            emailId,
            password,
            // confirmPassword,
        } = req.body;
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({
                status: "Fail",
                message: "Email address already in use",
            });
        }

        try {
            const { salt } = process.env.SALT;
            const hashedPassword = crypto
                .pbkdf2Sync(password, salt, 1000, 64, "sha512")
                .toString("hex");
            const user = new User({
                firstName,
                lastName,
                emailId,
                password: hashedPassword,
                userRole: process.env.USER_ROLE,
            });
            await user.save();
            return res.status(201).json({
                status: "Success",
                message: "User created successfully",
                data: emailId,
            });
        } catch (err) {
            console.log("error :", err);
            return res.status(500).json({
                status: "Fail",
                message: "Server Error",
            });
        }
    },
};
