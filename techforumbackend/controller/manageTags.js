const { default: mongoose } = require("mongoose");
const Tag = require("../model/tag");
const logger = require("../log/logger");

module.exports = {
    /**
     * This function get data from req body to add tag in database from admin side
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    addTag: async (req, res) => {
        try {
            const tag = req.body.name;
            const newTag = new Tag({ name: tag });
            await newTag.save();
            logger.log("info", "Added Tag");
            return res.status(201).json({
                status: "Success",
                message: "Added Tag",
                data: newTag,
            });
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                logger.log("error", "Invalid Tag");
                return res.status(400).json({
                    status: "Fail",
                    message: "Invalid Tag",
                });
            }
            logger.log("error", `Server Error: ${err}`);
            return res.status(500).json({
                status: "Fail",
                message: `Server Error`,
            });
        }
    },

    /**
     * This function fetch all tags in admin side
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    getAllTags: async (req, res) => {
        try {
            const projection = { name: 1 };
            const tags = await Tag.find({}, projection).exec();
            const allTags = tags.map((tag) => ({
                tag: tag.name,
                // eslint-disable-next-line no-underscore-dangle
                id: tag._id,
            }));
            logger.log("info", "Tags Get Successfully");
            return res.status(201).json({
                status: "Success",
                message: "Tags Get Successfully",
                tags: allTags,
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
     * This function get data from req param to delete tags by admin
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    deleteTag: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                logger.log("error", "Tag Id not found");
                return res.status(404).json({
                    status: "Fail",
                    message: "Tag Id not found",
                });
            }
            const tag = await Tag.findByIdAndDelete({ _id: id });
            if (!tag) {
                logger.log("error", "Tag not found");
                return res.status(404).json({
                    status: "Fail",
                    message: "Tag not found",
                });
            }
            logger.log("info", "Tag deleted");
            return res.status(201).json({
                status: "Success",
                message: "Tag deleted",
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
