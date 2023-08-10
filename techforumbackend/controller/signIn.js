const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const UserRole = require("../model/userRole");
require("dotenv").config();

module.exports = {
    signIn: async (req, res) => {
        try {
            let { emailId } = req.body;
            const { password } = req.body;

            if (Object.keys(req.body).length === 0) {
                return res.status(404).json({ status: 404, message: "Data not Found" });
            }

            if (emailId === undefined) {
                return res.status(400).json({ status: 400, message: "Email-id not found" });
            }

            emailId = emailId.trim();
            if (emailId.length === 0) {
                return res.status(400).json({ status: 400, message: "Email-id can't be empty" });
            }

            if (password === undefined) {
                return res.status(400).json({ status: 400, message: "Password not found" });
            }

            if (password.length === 0) {
                return res.status(400).json({ status: 400, message: "Password can't be empty" });
            }

            const user = await User.findOne({ emailId });
            if (!user) {
                return res.status(400).json({
                    status: 400,
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

                const cookieString = `jwt=${token}; HttpOnly; Expires=${expirationTime.toUTCString()}; Path=/api/users`;
                res.setHeader("Set-Cookie", cookieString);
                return res.status(200).json({
                    status: 200,
                    message: "Signed in successfully",
                    body: {
                        _id: user._id,
                        role: user.userRole,
                        name: `${user.firstName} ${user.lastName}`,
                    },
                });
            }
            return res.status(401).json({
                status: 401,
                message: "Incorrect Email or password",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },

    userRole: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            const role = user.userRole;
            const userRole = await UserRole.findOne({ _id: role });

            return res.status(200).json({
                status: 200,
                userRole: userRole.roleName,
            });
        } catch (err) {
            if (err.name === "CastError" && err.kind === "ObjectId") {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid Id ",
                });
            }

            return res.status(500).json({
                status: 500,
                message: `Internal Server Error: ${err.message}`,
            });
        }
    },
};
