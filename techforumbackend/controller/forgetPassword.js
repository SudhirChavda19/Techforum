/* eslint-disable no-underscore-dangle */
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../model/user");
require("dotenv").config();

module.exports = {
    // eslint-disable-next-line consistent-return
    forgotPassword: async (req, res) => {
        try {
            let { emailId } = req.body;
            console.log(typeof req.body);
            console.log(typeof emailId);
            const { url } = process.env;

            if (Object.keys(req.body).length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Data not Found",
                });
            }
            if (emailId === undefined) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Email-id not found" });
            }

            emailId = emailId.trim();
            if (emailId.length === 0) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Email-id can't be empty" });
            }

            // eslint-disable-next-line no-useless-escape
            const emaildPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!emaildPattern.test(emailId)) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Please, Enter valid email-id" });
            }

            const user = await User.findOne({ emailId });
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: "User not found",
                });
            }
            const transporter = nodemailer.createTransport(
                {
                    service: "gmail",
                    auth: {
                        user: "techforum.forum@gmail.com",
                        pass: "vnxswvzfumzksleb",
                    },
                },
                { from: "TechForum" },
            );

            const mailOptions = {
                from: "TechForum <techforum.forum@gmail.com>",
                to: emailId,
                subject: "Reset Your Password",
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                    <title>Reset Password Email</title>
                </head>
            
                <body>
                    <div style=" 
                        padding: 26px;
                        text-align: center;
                        width: 375px;
                        border-radius: 6px;
                        box-shadow: 0px 0px 10px 2px rgb(156, 156, 156);">
                        <h1 style="color: #00b8d4;">TechForum</h1>
                        <hr>
                        <h2>Password Reset</h2>
                        <h4>Hello ${user.firstName}</h4>
                        <p>We have received a request to reset the password for the emailId: ${
    user.emailId
}.</p>
                        <p>You can reset your password by clicking the link below:</p>
                        <a href="${url + user._id}">
                            <button style="
                            background-color: #00b8d4;
                            color: white;
                            width: 250px;
                            padding: 10px;
                            border-radius: 20px;
                            font-size: 16px;">Reset your password</button></a>
                        <p>If you didn't request for a password reset, please let us know immediately by replying to this email.</p>
                        <p>-TechForum team</p>
                    </div>
                </body>
                </html>
  `,
            };
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return res.status(500).json({
                        status: 500,
                        message: "Server Error",
                    });
                }
                return res
                    .cookie("email", emailId, {
                        maxAge: 900000,
                        httpOnly: true,
                        path: "/forgotpassword",
                        sameSite: "none",
                        secure: true,
                    })
                    .status(201)
                    .json({
                        status: 201,
                        message: "Reset password email sent",
                    });
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
    resetPassword: async (req, res) => {
        try {
            let password = req.body.newPassword;
            let { confirmPassword } = req.body;
            const salt = "jkerhguierhojhfoiewrjcfklsdcmsdkl";
            const { email } = req.cookies;

            if (Object.keys(req.body).length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Data not Found",
                });
            }
            if (!email || !password) {
                return res.status(404).json({
                    status: 404,
                    message: "Missing email or password",
                });
            }
            const user = await User.findOne({ emailId: email });

            if (!user) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid Email or user",
                });
            }

            if (password === undefined) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Password not found" });
            }

            password = password.trim();
            if (password.length === 0) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Password can't be empty" });
            }

            const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[A-Za-z0-9!@#$%^&*]{6,}$/;
            if (!password.match(passwordPattern)) {
                return res
                    .status(400)
                    .json({
                        status: 400,
                        message:
              "Invalid password, password must have atleast one uppercase, one number, one special character and minimum 6 length",
                    });
            }

            if (confirmPassword === undefined) {
                return res
                    .status(400)
                    .json({ status: 400, message: "please enter the Confirm password" });
            }

            confirmPassword = confirmPassword.trim();
            if (confirmPassword.length === 0) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Confirm Password can't be empty" });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({
                    status: 400,
                    message: "Password not matched",
                });
            }
            const hashedPassword = crypto
                .pbkdf2Sync(password, salt, 1000, 64, "sha512")
                .toString("hex");
            user.password = hashedPassword;
            await user.save();
            return res
                .clearCookie("email", { path: "/forgotpassword" })
                .status(201)
                .json({
                    status: 201,
                    message: "Password updated successfully",
                });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
};
