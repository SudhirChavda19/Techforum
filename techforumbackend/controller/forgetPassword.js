/* eslint-disable no-underscore-dangle */
// const { ServiceBusTrigger } = require("@azure/functions");
const { EmailClient } = require("@azure/communication-email");
// import { DefaultAzureCredential } from "@azure/identity";
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../model/user");
require("dotenv").config();
const logger = require("../log/logger");

module.exports = {
  // eslint-disable-next-line consistent-return

  /**
   * This function get req body to sent reset password email to user
   * @param {Object} req req contain data that comes from client
   * @param {Object} res res send response to client
   * @returns {Object} server will return response in json object
   */
  forgotPassword: async (req, res) => {
    try {
      const { emailId } = req.body;
      console.log("Email: ", emailId);
      const connectionString = `endpoint=https://techforumemailservice.india.communication.azure.com/;accesskey=9jflucEO9EcQ+z3NFd9w6oD/gi5DMKtEYegV/n/wewJvEASLWS2lnz36F9yXZfbOUfZDnyFD/RmvNX7XrBuK7A==`;
      const client = new EmailClient(connectionString);

      const message = {
        senderAddress: "heetahir39@gmail.com",
        content: {
          subject: "This is the subject",
          plainText: "This is the body",
        },
        recipients: {
          to: [
            {
              address: emailId,
              displayName: "vishal Ahir",
            },
          ],
        },
      };

      const poller = await client.beginSend(message);

      const response = await poller.pollUntilDone();
      console.log("Email Response: ", response);
      return res.status(201).json({
        status: "Success",
        message: "Reset password email sent",
      });
    } catch (err) {
      logger.log("error", `Server Error: ${err}`);
      return res.status(500).json({
        status: "Fail",
        message: "Server Error",
      });
    }

    //         try {
    //             const { emailId } = req.body;
    //             const { url } = process.env;
    //             const user = await User.findOne({ emailId });
    //             if (!user) {
    //                 logger.log("error", "User not found");
    //                 return res.status(404).json({
    //                     status: "Fail",
    //                     message: "User not found",
    //                 });
    //             }
    //             const transporter = nodemailer.createTransport(
    //                 {
    //                     service: "gmail",
    //                     auth: {
    //                         user: "techforum.forum@gmail.com",
    //                         pass: "vnxswvzfumzksleb",
    //                     },
    //                 },
    //                 { from: "TechForum" },
    //             );

    //             const mailOptions = {
    //                 from: "TechForum <techforum.forum@gmail.com>",
    //                 to: emailId,
    //                 subject: "Reset Your Password",
    //                 html: `
    //                 <!DOCTYPE html>
    //                 <html>
    //                 <head>
    //                     <meta charset="utf-8">
    //                     <meta http-equiv="x-ua-compatible" content="ie=edge">
    //                     <title>Reset Password Email</title>
    //                 </head>

    //                 <body>
    //                     <div style="
    //                         padding: 26px;
    //                         text-align: center;
    //                         width: 375px;
    //                         border-radius: 6px;
    //                         box-shadow: 0px 0px 10px 2px rgb(156, 156, 156);">
    //                         <h1 style="color: #00b8d4;">TechForum</h1>
    //                         <hr>
    //                         <h2>Password Reset</h2>
    //                         <h4>Hello ${user.firstName}</h4>
    //                         <p>We have received a request to reset the password for the emailId: ${
    //     user.emailId
    // }.</p>
    //                         <p>You can reset your password by clicking the link below:</p>
    //                         <a href="${url + user._id}">
    //                             <button style="
    //                             background-color: #00b8d4;
    //                             color: white;
    //                             width: 250px;
    //                             padding: 10px;
    //                             border-radius: 20px;
    //                             font-size: 16px;">Reset your password</button></a>
    //                         <p>If you didn't request for a password reset, please let us know immediately by replying to this email.</p>
    //                         <p>-TechForum team</p>
    //                     </div>
    //                 </body>
    //                 </html>
    //   `,
    //             };
    //             transporter.sendMail(mailOptions, (err) => {
    //                 if (err) {
    //                     logger.log("error", `Server Error: ${err}`);
    //                     return res.status(500).json({
    //                         status: "Fail",
    //                         message: "Server Error",
    //                     });
    //                 }
    //                 logger.log("info", "Reset password email sent");
    //                 return res
    //                     .cookie("email", emailId, {
    //                         maxAge: 900000,
    //                         httpOnly: true,
    //                         path: "/forgotpassword",
    //                         sameSite: "none",
    //                         secure: true,
    //                     })
    //                     .status(201)
    //                     .json({
    //                         status: "Success",
    //                         message: "Reset password email sent",
    //                     });
    //             });
    //         } catch (err) {
    //             logger.log("error", `Server Error: ${err}`);
    //             return res.status(500).json({
    //                 status: "Fail",
    //                 message: "Server Error",
    //             });
    //         }
  },

  /**
   * This function get data from req body to reset new password
   * @param {Object} req req contain data that comes from client
   * @param {Object} res res send response to client
   * @returns {Object} server will return response in json object
   */
  resetPassword: async (req, res) => {
    try {
      const password = req.body.newPassword;
      // const { confirmPassword } = req.body;
      const salt = "jkerhguierhojhfoiewrjcfklsdcmsdkl";
      const { email } = req.cookies;

      if (!email || !password) {
        logger.log("error", "Missing email or password");
        return res.status(404).json({
          status: "Fail",
          message: "Missing email or password",
        });
      }
      const user = await User.findOne({ emailId: email });

      if (!user) {
        logger.log("error", "Invalid Email or user");
        return res.status(400).json({
          status: "Fail",
          message: "Invalid Email or user",
        });
      }

      const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
      user.password = hashedPassword;
      await user.save();
      logger.log("info", "Password updated successfully");
      return res
        .clearCookie("email", { path: "/forgotpassword" })
        .status(201)
        .json({
          status: "Success",
          message: "Password updated successfully",
        });
    } catch (err) {
      logger.log("error", `Server Error: ${err}`);
      return res.status(500).json({
        status: "Fail",
        message: "Server Error",
      });
    }
  },
};
