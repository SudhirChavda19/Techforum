const Blog = require("../model/blog");
const logger = require("../log/logger");

/**
     * This function get data from req query to fetch all the blog using pagination
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// get all posted blogs
exports.blogs = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 8;
        const pipeline = [
            {
                $match: {
                    isApproved: true,
                },
            },
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
        logger.log("info", "Blog Fetched!");
        return res.status(201).json({
            status: "Success",
            message: "Blog Fetched!",
            blogs,
        });
    } catch (error) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server error",
        });
    }
};

/**
     * This function get data from req param to fetch a blog by a question
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// get a specific blog
exports.blog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate([
            {
                path: "userId",
            },
        ]);
        if (!blog) {
            logger.log("error", "Blog not found!");
            return res.status(404).json({
                status: "Fail",
                message: "Blog not found!",
            });
        }
        logger.log("info", "Succesfully got the Blog");
        return res.status(201).send({
            status: "Success",
            message: "Succesfully got the Blog",
            data: blog,
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get data from req body to post/create a blog
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// post a new blog
exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const createdDate = Date.now();
    const { userId } = req.body;

    const blog = new Blog({
        userId,
        title,
        content,
        createdDate,
    });
    try {
        await blog.save();
        logger.log("info", "Blog posted successfully");
        return res.status(201).json({
            status: "Success",
            message: "Blog posted successfully",
            data: blog,
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get data from req param to fetch a blog by an user
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// blog get using userId
exports.getBlog = async (req, res) => {
    try {
        const { userId } = req.params;
        const blog = await Blog.find({ userId }).populate([
            {
                path: "userId",
            },
        ]);
        if (!blog) {
            logger.log("error", "Data not Found");
            return res.status(404).json({
                status: "Fail",
                message: "Data not Found",
            });
        }
        logger.log("info", "Blog get successfully");
        return res.status(200).json({
            status: "Success",
            message: "Blog get successfully",
            data: blog,
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function fetch all blog title data
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
exports.getBlogTitle = async (req, res) => {
    try {
        const projection = { title: 1 };
        const blogsd = await Blog.find({ isApproved: true }, projection).exec();
        const blogsData = blogsd.map((btitle) => ({
            title: btitle.title,
        }));
        logger.log("info", "Blog Title get successfully");
        return res.status(201).json({
            status: "Success",
            message: "Blog Title get successfully",
            blogs: blogsData,
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get data from req param to delete a blog
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// delete an existing blog
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteblog = await Blog.findByIdAndDelete(id);
        if (!deleteblog) {
            logger.log("error", "Already deleted!");
            return res.status(404).json({
                status: "Fail",
                message: "Already deleted!",
            });
        }
        logger.log("info", "Succesfully deleted a blog");
        return res.status(201).send({
            status: "Success",
            message: "Succesfully deleted a blog",
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get data from req body to update the blog
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// update an existing blog
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const updatedDate = Date.now();
        const updateblog = await Blog.findByIdAndUpdate(
            id,
            { ...update, updatedDate },
            {
                new: true,
            },
        );

        if (!updateblog) {
            logger.log("error", "Blog not found!");
            return res.status(404).json({
                status: "Fail",
                message: "Blog not found!",
            });
        }
        logger.log("info", "Succesfully updated a blog");
        return res.status(201).send({
            status: "Success",
            message: "Succesfully updated a blog",
            data: updateblog,
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};
