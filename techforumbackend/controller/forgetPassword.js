/* eslint-disable no-underscore-dangle */
const { EmailClient } = require("@azure/communication-email");
const crypto = require("crypto");
const User = require("../model/user");
require("dotenv").config();
const logger = require("../log/logger");
require("dotenv").config();

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
      const { URL } = process.env;
      const user = await User.findOne({ emailId });
      if (!user) {
        logger.log("error", "User not found");
        return res.status(404).json({
          status: "Fail",
          message: "User not found",
        });
      }
      console.log("userId: ", user._id);
      const connectionString = `endpoint=https://techforum-email.india.communication.azure.com/;accesskey=I1fQmJD6bQdwLhlfyTZaqZm6glLwz8vVaS1rMfyq3+u5bnu2KI46VthCXswBr2JAGw/pXISnOBJOmnuQDN+cjw==`;
      const client = new EmailClient(connectionString);

      const message = {
        senderAddress:
          "donotreply@1cb8e569-fd6f-4881-82ee-f1c9dd6fca16.azurecomm.net",
        content: {
          subject: "Reset Your Password",
          html: `<!DOCTYPE html>
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
                  <p>We have received a request to reset the password for the emailId: ${user.emailId}.</p>
                  <p>You can reset your password by clicking the link below:</p>
                  <a href="http://localhost:4200/#/forgotpassword/reset-password/${user._id}">
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
          </html>`,
        },
        recipients: {
          to: [
            {
              address: emailId,
              displayName: `${user.firstName} ${user.lastName}`,
            },
          ],
        },
      };

      const poller = await client.beginSend(message);
      const response = await poller.pollUntilDone();
      console.log("Email Response: ", response);

      const cookieString = `email=${emailId}; HttpOnly; Expires=${900000}; SameSite=None; Secure; Path=/api/forgotpassword`;
      res.setHeader("Set-Cookie", cookieString);
      logger.log("info", "Reset password email sent");
      return res.status(201).json({
        status: "Success",
        message: "Reset password email sent",
      });
    } catch (err) {
      logger.log("error", `Server Error: ${err}`);
      console.log("error", `Server Error: ${err}`);
      return res.status(500).json({
        status: "Fail",
        message: "Server Error",
      });
    }
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
      const { confirmPassword } = req.body;
      const cookie = decodeURIComponent(req.headers.cookies);
      const email = cookie.slice(6, cookie.length);
      console.log("email from cookie: ", req.headers);
      logger.log("email from cookie: ", req.headers);
      console.log("email from cookie: ", cookie);
      logger.log("email from cookie: ", cookie);
      console.log("email from cookie: ", email);
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
          message: "Invalid Email",
        });
      }

      const hashedPassword = crypto
        .pbkdf2Sync(password, process.env.SALT, 1000, 64, "sha512")
        .toString("hex");
      user.password = hashedPassword;
      await user.save();
      // const expirationTime = new Date(Date.now() + 0);
      // const expiredCookieString = `email=; HttpOnly; Expires=${expirationTime.toUTCString()}; Path=/api/forgotpassword`;
      // res.setHeader("Set-Cookie", expiredCookieString);  
      logger.log("info", "Password updated successfully");
      return res
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
