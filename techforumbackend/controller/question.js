const Question = require("../model/question");
const Bookmark = require("../model/bookmark");
const Answer = require("../model/answer");
const logger = require("../log/logger");

/**
 * This function accept data and create question
 * @param {Object} req req contain data that comes from client
 * @param {Object} res res send response to client
 * @returns {Object} server will return response in json object
 */
// post a question
exports.createQuestion = async (req, res) => {
    const { userId } = req.body;
    const { question } = req.body;
    const { questionDescribe } = req.body;
    const { tags } = req.body;
    const createdAt = Date.now();

    const questionData = await Question.findOne({ question });
    if (questionData !== null) {
        if (questionData.question === question) {
            logger.log("error", "Question already exist");
            return res.status(400).json({
                status: "Fail",
                message: "Question already exist",
            });
        }
    }
    try {
        const questionCreated = new Question({
            userId,
            question,
            tags,
            questionDescribe,
            createdAt,
        });
        await questionCreated.save();
        logger.log("info", "Question created successfully");
        return res.status(201).json({
            status: "Success",
            message: "Question created successfully",
            data: questionCreated,
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            error: "Server Error",
        });
    }
};

/**
 * This function send data to the user in form of pagination
 * @param {Object} req req contain data that comes from client
 * @param {Object} res res send response to client
 * @returns {Object} server will return response in json object
 */
// question pagination
exports.questionPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber, 10) || 1;
        const limit = parseInt(req.query.pageSize, 10) || 8;
        const skip = (page - 1) * limit;

        const questionsData = await Question.find()
            .skip(skip)
            .limit(limit)
            .populate([
                {
                    path: "userId",
                },
            ]);
        const count = await Question.countDocuments();
        const check = page * limit;
        if (check > count) {
            logger.log("error", "please decrease the limit or page");
            return res.status(404).json({
                status: "Fail",
                message: "please decrease the limit or page",
            });
        }

        const totalPages = Math.ceil(count / limit);
        const hasMore = page < totalPages;

        if (!questionsData) {
            logger.log("error", "Data Not Found");
            return res.status(404).json({
                status: "Fail",
                message: "Data Not Found",
            });
        }
        logger.log("info", "Questions Readed successfully");
        return res.status(200).json({
            status: "Success",
            message: "Questions Readed successfully",
            data: questionsData,
            nbHits: questionsData.length,
            totalPages,
            hasMore,
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
 * This function send all question to the user
 * @param {Object} req req contain data that comes from user
 * @param {Object} res res send response to user
 * @returns {Object} server will return response in json object
 */
// read the questions from database
exports.readQuestions = async (req, res) => {
    try {
        const questionsData = await Question.find().populate([
            {
                path: "userId",
            },
        ]);
        if (!questionsData) {
            logger.log("error", "Data Not Found");
            return res.status(404).json({
                status: "Fail",
                message: "Data Not Found",
            });
        }
        logger.log("info", "Questions Readed successfully");
        return res.status(200).json({
            status: "Success",
            message: "Questions Readed successfully",
            data: questionsData,
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
 * This function get one question id and send response to user
 * @param {Object} req req contain data that comes from client
 * @param {Object} res res send response to client
 * @returns {Object} server will return response in json object
 */
// get a speific question by question id
exports.readByIdQuestion = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();
        const questionData = await Question.findById({ _id: id }).populate([
            {
                path: "userId",
            },
        ]);

        if (!questionData) {
            logger.log("error", "Data Not Found, Please enter valid question id");
            return res.status(404).json({
                status: "Fail",
                message: "Data Not Found, Please enter valid question id",
            });
        }
        logger.log("info", "Question Readed successfully");
        return res.status(200).json({
            status: "Success",
            message: "Question Readed successfully",
            data: questionData,
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
 * This function get one user id and send responce of that user post question
 * @param {Object} req req contain data that comes from client
 * @param {Object} res res send response to client
 * @returns {Object} server will return response in json object
 */
// get a speific question by user id
exports.readByIdUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const questionData = await Question.find({ userId }).populate([
            {
                path: "userId",
            },
        ]);

        if (!questionData) {
            logger.log("error", "Data Not Found, Please enter valid user Id");
            return res.status(400).json({
                status: "Fail",
                message: "Data Not Found, Please enter valid user Id",
            });
        }
        logger.log("info", "Question Readed successfully");
        return res.status(200).json({
            status: "Success",
            message: "Question Readed successfully",
            data: questionData,
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
 * This function get one question id from params and
 *  update that question send responce as that question
 * @param {Object} req req contain data that comes from client
 * @param {Object} res res send response to client
 * @returns {Object} server will return response in json object
 */
// update perticular question
exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const updatedAt = Date.now();
        const updateQuestion = await Question.findByIdAndUpdate(
            id,
            { ...update, updatedAt },
            {
                new: true,
            },
        );

        if (!updateQuestion) {
            logger.log("error", "Data Not Found, Enter valid id");
            return res.status(400).json({
                status: "Fail",
                message: "Data Not Found, Enter valid id",
            });
        }
        logger.log("info", "Question Updated Successfully");
        return res.status(200).json({
            status: "Success",
            message: "Question Updated Successfully",
            data: updateQuestion,
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
 * This function get one question id from params and delete that question
 * @param {Object} req req contain data that comes from client
 * @param {Object} res res send response to client
 * @returns {Object} server will return response in json object
 */
// delete perticular question
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteQuestion = await Question.findByIdAndDelete(id);
        if (!deleteQuestion) {
            logger.log("error", "Data Not Found, Enter valid id");
            return res.status(404).json({
                status: "Fail",
                message: "Data Not Found, Enter valid id",
            });
        }
        await Bookmark.deleteMany({ questionId: id });
        await Answer.deleteMany({ questionId: id });
        logger.log("info", "Question Deleted Successfully");
        return res.status(200).json({
            status: "Success",
            message: "Question Deleted Successfully",
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};
