/* eslint-disable no-underscore-dangle */
const { EmailClient } = require("@azure/communication-email");
const crypto = require("crypto");
const User = require("../model/user");
require("dotenv").config();
const nodemailer = require("nodemailer");
const logger = require("../log/logger");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
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
    console.log("dikgdddfmg", req.body);
    try {
      const { emailId } = req.body;
      const url = process.env.URL;
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
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        { from: "TechForum" }
      );
      let from = `TechForum <techforum.forum@gmail.com>`;

      const handlebarOptions = {
        viewEngine: {
          partialsDir: path.resolve("./views/"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./views/"),
      };
      transporter.use("compile", hbs(handlebarOptions));
      const mailOptions = {
        from: from,
        to: emailId,
        subject: "Reset Your Password",
        template: "email",
        context: {
          name: user.firstName,
          emailId: user.emailId,
          link: url + user._id,
        },
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: 500,
            message: "Server Error",
          });
        } else {
          res
            .cookie("email", emailId, {
              maxAge: 900000,
              httpOnly: true,
              path: "/forgotpassword",
            })
            .status(201)
            .json({
              status: 201,
              message: "Reset password email sent",
            });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
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
      const email = "sudhir.chavda@volansys.com";
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
      const expirationTime = new Date(Date.now() + 0);
      const expiredCookieString = `email=; HttpOnly; Expires=${expirationTime.toUTCString()}; Path=/`;
      res.setHeader("Set-Cookie", expiredCookieString);  
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
