/* eslint-disable import/no-extraneous-dependencies */
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const User = require("../model/user");
require("dotenv").config();

module.exports = {
    /**
     * This function accept data and create a new user
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
            confirmPassword,
        } = req.body;
        // const result = validationResult(req);
        // if (result.isEmpty()) {
        //     return res.send(`Hello, ${req.query.person}!`);
        // }

        // res.send({ errors: result.array() });

        // const namePattern = /^[a-zA-Z]+$/;
        // if (Object.keys(req.body).length === 0) {
        //     return res.status(404).json({
        //         status: 404,
        //         message: "Data not Found",
        //     });
        // }
        // if (firstName === undefined) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Firstname not found" });
        // }
        // firstName = firstName.trim();
        // if (firstName.length === 0) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "FirstName can't be empty" });
        // }

        // if (!namePattern.test(firstName)) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Invalid firstname, f
        // irstname must be string and white space not allow" });
        // }

        // if (lastName === undefined) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Lastname not found" });
        // }
        // lastName = lastName.trim();

        // if (lastName.length === 0) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Lastname can't be empty" });
        // }
        // if (!namePattern.test(lastName)) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Invalid lastname,
        // lastname must be string and white space not allow" });
        // }

        // if (emailId === undefined) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Email-id not found" });
        // }

        // emailId = emailId.trim();
        // if (emailId.length === 0) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Email-id can't be empty" });
        // }

        // const emaildPattern = /^[a-zA-Z0-9.!#$%&'
        // *+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        // if (!emaildPattern.test(emailId)) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Please, Enter valid email-id" });
        // }

        // if (password === undefined) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Password not found" });
        // }

        // password = password.trim();
        // if (password.length === 0) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Password can't be empty" });
        // }

        // const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[
        // !@#$%^&*])(?=.*[a-z])[A-Za-z0-9!@#$%^&*]{6,}$/;
        // if (!password.match(passwordPattern)) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Invalid password,
        // password must have atleast one uppercase, one number,
        // one special character and minimum 6 length" });
        // }

        // if (confirmPassword === undefined) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "please enter the Confirm password" });
        // }

        // confirmPassword = confirmPassword.trim();
        // if (confirmPassword.length === 0) {
        //     return res
        //         .status(400)
        //         .json({ status: 400, message: "Confirm Password can't be empty" });
        // }

        // if (password !== confirmPassword) {
        //     return res.status(400).json({
        //         status: 400,
        //         message: "Password not matched",
        //     });
        // }

        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
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
                status: 201,
                message: "User created successfully",
                data: emailId,
            });
        } catch (err) {
            console.log("error :", err);
            return res.status(500).json({
                status: 500,
                message: " sorry Server Error",
            });
        }
    },
};
