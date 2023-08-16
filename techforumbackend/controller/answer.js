const Answer = require("../model/answer");
/**
     * This function get data from req to post answer for question
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// creates an answer to that question
exports.addAnswer = async (req, res) => {
    const { answer, userId, questionId } = req.body;
    const addAnswer = new Answer({
        userId,
        questionId,
        answer,
    });
    try {
        await addAnswer.save();
        return res.status(201).json({
            status: "Success",
            message: "Answer Posted successfully",
            data: addAnswer,
        });
    } catch (err) {
        return res.status(500).json({
            status: "Fail",
            error: "Server Error",
        });
    }
};

/**
     * This function get questionid from param to get answer for a question
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// get answer to that question
exports.getAnswerByquestionId = async (req, res) => {
    try {
        const { questionId } = req.params;
        const getanswer = await Answer.find({
            questionId,
        }).populate([
            {
                path: "userId",
            }, {
                path: "questionId",
            },
        ]);
        if (!getanswer) {
            return res.status(404).json({
                status: "Fail",
                message: "Data Not Found, Please enter valid question id",
            });
        }
        return res.status(201).json({
            status: "Success",
            message: "Answer get successfully",
            data: getanswer,
        });
    } catch (err) {
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get data from req to update answer
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// edits the given specific answer
exports.editAnswer = async (req, res) => {
    try {
        const id = req.params;
        const editanswer = await Answer.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!editanswer) {
            return res.status(404).json({
                status: "Fail",
                message: "Answer not found, Enter valid id",
            });
        }
        return res.status(201).json({
            status: "Success",
            message: "Answer Updated successfully",
        });
    } catch (err) {
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get answerid from param to delete answer
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// deletes the given specific answer
exports.deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteanswer = await Answer.findByIdAndDelete({ _id: id });
        if (!deleteanswer) {
            return res.status(404).json({
                status: "Fail",
                message: "Answer already deleted!",
            });
        }
        return res.status(201).send({
            status: "Success",
            message: "Answer deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get data from req body to upvote the answer
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// post upvotes
exports.Upvote = async (req, res) => {
    const answerId = req.params.id;
    const userId = req.body.upvotes;

    const vote = await Answer.findOne({ _id: answerId });
    if (vote.upvotes.includes(userId)) {
        await Answer.updateOne(
            { _id: answerId },
            { $pull: { upvotes: userId } },
        );
        return res.status(201).json({
            status: "Success",
            message: "Upvote removed",
        });
    }
    await Answer.updateOne(
        { _id: answerId },
        { $addToSet: { upvotes: userId }, $pull: { downvotes: userId } },
    );
    return res.status(201).json({
        status: "Success",
        message: "Upvoted Successfully",
    });
};

/**
     * This function get data from req body to downvote the answer
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// post downvotes
exports.Downvote = async (req, res) => {
    const answerId = req.params.id;
    const userId = req.body.downvotes;
    const vote = await Answer.findOne({ _id: answerId });
    if (vote.downvotes.includes(userId)) {
        await Answer.updateOne(
            { _id: answerId },
            { $pull: { downvotes: userId } },
        );
        return res.status(201).json({
            status: "Success",
            message: "Downvote removed",
        });
    }
    await Answer.updateOne(
        { _id: answerId },
        { $addToSet: { downvotes: userId }, $pull: { upvotes: userId } },
    );
    return res.status(201).json({
        status: "Success",
        message: "Downvoted Successfully",
    });
};

// /**
//      * This function get data from req to post answer for question
//      * @param {Object} req req contain data that comes from client
//      * @param {Object} res res send response to client
//      * @returns {Object} server will return response in json object
//      */
// // total upvotes
// exports.checkup = async (req, res) => {
//     if (req.params === undefined) {
//         return res.status(404).json({
//             status: "Fail",
//             message: "Enter the answer id in params",
//         });
//     }
//     let answerId = req.params.id;
//     answerId = answerId.trim();
//     if (answerId.length !== 24) {
//         return res.status(400).json({
//             status: "Fail",
//             message: "Invalid answer id",
//         });
//     }
//     try {
//         const vote = await Answer.find({ _id: answerId });
//         const totalupvote = vote.upvotes.length;
//         if (!vote) {
//             return res.status(404).json({
//                 satus: "Fail",
//                 message: "Data not found",
//             });
//         }
//         return res.status(201).json({
//             status: "Success",
//             body: totalupvote,
//         });
//     } catch (err) {
//         console.log("Error: ", err);
//         return res.status(500).json({
//             satus: "Fail",
//             message: "Server Error",
//         });
//     }
// };

// /**
//      * This function get data from req to post answer for question
//      * @param {Object} req req contain data that comes from client
//      * @param {Object} res res send response to client
//      * @returns {Object} server will return response in json object
//      */
// // total downvotes
// exports.checkdown = async (req, res) => {
//     if (req.params === undefined) {
//         return res.status(404).json({
//             status: "Fail",
//             message: "Enter the answer id in params",
//         });
//     }
//     let answerId = req.params.id;
//     answerId = answerId.trim();
//     if (answerId.length !== 24) {
//         return res.status(400).json({
//             status: "Fail",
//             message: "Invalid answer id",
//         });
//     }
//     try {
//         const vote = await Answer.find({ _id: answerId });
//         const totaldownvote = vote;
//         console.log("dddd: ", vote);
//         if (!vote) {
//             return res.status(404).json({
//                 status: "Fail",
//                 message: "Data not found",
//             });
//         }
//         return res.status(201).json({
//             status: "Success",
//             body: totaldownvote,
//         });
//     } catch (err) {
//         return res.status(500).json({
//             status: "Fail",
//             message: "Server Error",
//         });
//     }
// };
