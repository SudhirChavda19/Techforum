const Bookmark = require("../model/bookmark");

module.exports = {
    /**
     * This function get data from req body to add or remove bookmark to a question
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    addBookmark: async (req, res) => {
        try {
            const { questionId } = req.body;
            const { userId } = req.body;
            const addedBookmark = await Bookmark.findOne({ userId, questionId });

            if (addedBookmark) {
                // eslint-disable-next-line no-underscore-dangle
                await Bookmark.findByIdAndDelete(addedBookmark._id);
                return res.status(200).json({
                    status: "Success",
                    message: "Bookmark removed",
                });
            }
            const bookmark = new Bookmark({ userId, questionId });
            await bookmark.save();
            return res.status(201).json({
                status: "Success",
                message: "Added bookmark",
                data: bookmark,
            });
        } catch (err) {
            return res.status(500).json({
                status: "Fail",
                message: "Server Error",
            });
        }
    },

    /**
     * This function get data from req param to fetch manage bookmark by user
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    getmanageBookmarkById: async (req, res) => {
        try {
            const { userId } = req.params;
            const bookmarks = await Bookmark.find({ userId }).populate([
                {
                    path: "questionId",
                    populate: {
                        path: "userId",
                        model: "user",
                    },
                },
            ]);
            return res.status(200).json({
                status: "Success",
                message: "Bookmarks",
                data: bookmarks,
            });
        } catch (err) {
            return res.status(500).json({
                status: "Fail",
                message: "Server Error",
            });
        }
    },

    /**
     * This function get data from req param to fetch bookmark for a user
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    getBookmarkByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const bookmarks = await Bookmark.find({ userId });
            return res.status(200).json({
                status: "Success",
                message: "Bookmarks",
                data: bookmarks,
            });
        } catch (err) {
            return res.status(500).json({
                status: "Fail",
                message: "Server Error",
            });
        }
    },
};
