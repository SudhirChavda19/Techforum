const User = require("../model/user");
const Bookmark = require("../model/bookmark");
const Answer = require("../model/answer");
const Question = require("../model/question");
const Blog = require("../model/blog");
const Doc = require("../model/doc");
const logger = require("../log/logger");

module.exports = {
    /**
     * This function fetch all users in admin side
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    getAllUsers: async (req, res) => {
        try {
            const projection = {
                userId: 1, emailId: 1, firstName: 1, lastName: 1,
            };
            const users = await User.find({}, projection).exec();
            if (!users) {
                logger.log("error", "Users not found");
                return res.status(404).json({
                    status: "Fail",
                    message: "Users not found",
                });
            }
            const usersData = users.map((user) => ({
                // eslint-disable-next-line no-underscore-dangle
                userId: user._id,
                emailId: user.emailId,
                firstName: user.firstName,
                lastName: user.lastName,
            }));
            logger.log("info", "Users get Successfully");
            return res.status(201).json({
                status: "Success",
                message: "Users get Successfully",
                users: usersData,
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
     * This function get data from req param to delete user by admin
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                logger.log("error", "UserId not found");
                return res.status(404).json({
                    status: "Fail",
                    message: "UserId not found",
                });
            }
            const user = await User.deleteOne({ _id: userId });
            await Bookmark.deleteMany({ userId });
            await Answer.deleteMany({ userId });
            await Question.deleteMany({ userId });
            await Blog.deleteMany({ userId });
            await Doc.deleteMany({ userId });

            if (!user) {
                logger.log("error", "User Already Deleted");
                return res.status(400).json({
                    status: "Fail",
                    message: "User Already Deleted",
                });
            }
            logger.log("info", "User deleted successfully");
            return res.status(201).json({
                status: "Success",
                message: "User deleted successfully",
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
