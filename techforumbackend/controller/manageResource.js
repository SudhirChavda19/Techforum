const Blog = require("../model/blog");
const Document = require("../model/doc");
const logger = require("../log/logger");

/**
     * This function get data from req body and param to approve blog by admin to post
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// update an existing blog
module.exports = {
    approveBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const update = req.body;
            const updateblog = await Blog.findByIdAndUpdate(id, update, {
                new: true,
            });

            if (!updateblog) {
                logger.log("error","Blog not found!");
                return res.status(404).json({
                    status: "Fail",
                    message: "Blog not found!",
                });
            }
            logger.log("info", "Succesfully approved a blog");
            return res.status(201).json({
                status: "Success",
                message: "Succesfully approved a blog",
                data: updateblog,
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
     * This function get data from req body and param to approve document by admin to post
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    approveDocument: async (req, res) => {
        try {
            const { id } = req.params;
            const approve = req.body;
            const approvedoc = await Document.findByIdAndUpdate(id, approve, {
                new: true,
            });

            if (!approvedoc) {
                logger.log("error", "Document not found!");
                return res.status(404).json({
                    status: "Fail",
                    message: "Document not found!",
                });
            }
            logger.log("info", "Succesfully approved document");
            return res.status(201).send({
                status: "Success",
                message: "Succesfully approved document",
                data: approvedoc,
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
     * This function get data from req query to fetch all blogs on admin side
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    blogs: async (req, res) => {
        try {
            const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 8;
            const pipeline = [
                {
                    $sort: {
                        createdDate: -1,
                    },
                },
                {
                    $skip: (pageNumber - 1) * pageSize,
                },
                {
                    $limit: pageSize,
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: "$user",
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        content: 1,
                        isApproved: 1,
                        createdDate: 1,
                        "user.firstName": 1,
                        "user.lastName": 1,
                    },
                },
            ];

            const blogs = await Blog.aggregate(pipeline);
            logger.log("info", "Blog get Succesfully");
            return res.status(201).json({
                status: "Success",
                message: "Blog get Succesfully",
                body: blogs,
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
     * This function get data from req query to fetch all documents on admin side
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
    getDocument: async (req, res) => {
        try {
            const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 5;
            const pipeline = [
                {
                    $sort: {
                        createdDate: -1,
                    },
                },
                {
                    $skip: (pageNumber - 1) * pageSize,
                },
                {
                    $limit: pageSize,
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: "$user",
                },
                {
                    $project: {
                        _id: 1,
                        fileName: 1,
                        docData: 1,
                        isApproved: 1,
                        createdDate: 1,
                        "user.firstName": 1,
                        "user.lastName": 1,
                    },
                },
            ];

            const docs = await Document.aggregate(pipeline);
            logger.log("info", "Document get Succesfully");
            return res.status(201).json({
                status: "Success",
                message: "Document get Succesfully",
                body: docs,
            });
        } catch (error) {
            logger.log("error", `Server Error: ${err}`);
            return res.status(500).json({
                status: "Fail",
                message: "Server Error",
            });
        }
    },
};
