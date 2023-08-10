const Answer = require("../model/answer");

// creates an answer to that question
exports.addAnswer = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res
            .status(404)
            .json({
                status: 404,
                message: "Data not Found",
            });
    }
    let { answer, userId, questionId } = req.body;
    if (userId === undefined) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "UserId not found",
            });
    }
    userId = userId.trim();
    if (userId.length === 0) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "UserId can't be empty",
            });
    }
    if (userId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Enter Invalid user id",
        });
    }

    if (answer === undefined) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "Answer not found",
            });
    }
    answer = answer.trim();
    if (answer.length === 0) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "Answer can't be empty",
            });
    }

    if (questionId === undefined) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "Question Id not found",
            });
    }
    questionId = questionId.trim();
    if (questionId.length === 0) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "QuestionId can't be empty",
            });
    }
    if (questionId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Enter Invalid question id",
        });
    }
    const addAnswer = new Answer({
        userId,
        questionId,
        answer,
    });
    try {
        await addAnswer.save();
        return res.status(201).json({
            status: 201,
            message: "Answer Posted successfully",
            data: addAnswer,
        });
    } catch (err) {
        return res.status(500).json({
            satus: 500,
            error: "Server Error",
        });
    }
};

// get answer to that question
exports.getAnswerByquestionId = async (req, res) => {
    try {
        let { questionId } = req.params;
        questionId = questionId.trim();
        if (questionId.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid question id",
            });
        }
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
                status: 404,
                message: "Data Not Found, Please enter valid question id",
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Answer get successfully",
            data: getanswer,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// edits the given specific answer
exports.editAnswer = async (req, res) => {
    try {
        if (req.params === undefined) {
            return res.status(404).json({
                status: 404,
                message: "Enter the answer id",
            });
        }
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid answer id",
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Data not Found",
            });
        }
        let { answer } = req.body;
        if (answer === undefined) {
            return res
                .status(400)
                .json({
                    status: 400,
                    message: "Answer not found",
                });
        }
        answer = answer.trim();
        if (answer.length === 0) {
            return res
                .status(400)
                .json({
                    status: 400,
                    message: "Answer can't be empty",
                });
        }
        const editanswer = await Answer.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!editanswer) {
            return res.status(404).json({
                status: 404,
                message: "Answer not found, Enter valid id",
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Answer Updated successfully",
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// deletes the given specific answer
exports.deleteAnswer = async (req, res) => {
    try {
        if (req.params === undefined) {
            return res.status(402).json({
                status: 402,
                message: "Enter the answer Id",
            });
        }
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid answer id",
            });
        }
        const deleteanswer = await Answer.findByIdAndDelete({ _id: id });
        if (!deleteanswer) {
            return res.status(404).json({
                status: 404,
                message: "Answer already deleted!",
            });
        }
        return res.status(201).send({
            status: 201,
            message: "Answer deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            satus: 500,
            message: "Server Error",
        });
    }
};

// post upvotes

exports.Upvote = async (req, res) => {
    if (req.params === undefined) {
        return res.status(404).json({
            status: 404,
            message: "Enter the answer id in params",
        });
    }
    let answerId = req.params.id;
    answerId = answerId.trim();
    if (answerId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Invalid answer id in params",
        });
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(404).json({
            status: 404,
            message: "Data not Found",
        });
    }
    let userId = req.body.upvotes;
    if (userId === undefined) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "Upvotes not found",
            });
    }
    userId = userId.trim();
    if (userId.length === 0) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "Upvotes can't be empty",
            });
    }
    if (userId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Enter Invalid upvotes user id",
        });
    }

    const vote = await Answer.findOne({ _id: answerId });
    if (vote.upvotes.includes(userId)) {
        await Answer.updateOne(
            { _id: answerId },
            { $pull: { upvotes: userId } },
        );
        return res.status(201).json({
            message: "Upvote removed",
        });
    }
    await Answer.updateOne(
        { _id: answerId },
        { $addToSet: { upvotes: userId }, $pull: { downvotes: userId } },
    );
    return res.status(201).json({
        message: "Upvoted Successfully",
    });
};

// post downvotes

exports.Downvote = async (req, res) => {
    if (req.params === undefined) {
        return res.status(404).json({
            status: 404,
            message: "Enter the answer id in params",
        });
    }
    let answerId = req.params.id;
    answerId = answerId.trim();
    if (answerId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Invalid answer id",
        });
    }
    let userId = req.body.downvotes;
    if (userId === undefined) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "Downvotes not found",
            });
    }
    userId = userId.trim();
    if (userId.length === 0) {
        return res
            .status(400)
            .json({
                status: 400,
                message: "Downvotes can't be empty",
            });
    }
    if (userId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Enter Invalid downvotes user id",
        });
    }

    const vote = await Answer.findOne({ _id: answerId });
    if (vote.downvotes.includes(userId)) {
        await Answer.updateOne(
            { _id: answerId },
            { $pull: { downvotes: userId } },
        );
        return res.status(201).json({
            message: "Downvote removed",
        });
    }
    await Answer.updateOne(
        { _id: answerId },
        { $addToSet: { downvotes: userId }, $pull: { upvotes: userId } },
    );
    return res.status(201).json({
        message: "Downvoted Successfully",
    });
};

// total upvotes
exports.checkup = async (req, res) => {
    if (req.params === undefined) {
        return res.status(404).json({
            status: 404,
            message: "Enter the answer id in params",
        });
    }
    let answerId = req.params.id;
    answerId = answerId.trim();
    if (answerId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Invalid answer id",
        });
    }
    try {
        const vote = await Answer.find({ _id: answerId });
        const totalupvote = vote.upvotes.length;
        if (!vote) {
            return res.status(404).json({
                satus: 404,
                message: "Data not found",
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Success",
            body: totalupvote,
        });
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({
            satus: 500,
            message: "Server Error",
        });
    }
};

// total downvotes
exports.checkdown = async (req, res) => {
    if (req.params === undefined) {
        return res.status(404).json({
            status: 404,
            message: "Enter the answer id in params",
        });
    }
    let answerId = req.params.id;
    answerId = answerId.trim();
    if (answerId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Invalid answer id",
        });
    }
    try {
        const vote = await Answer.find({ _id: answerId });
        const totaldownvote = vote;
        console.log("dddd: ", vote);
        if (!vote) {
            return res.status(404).json({
                satus: 404,
                message: "Data not found",
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Success",
            body: totaldownvote,
        });
    } catch (err) {
        return res.status(500).json({
            satus: 500,
            message: "Server Error",
        });
    }
};
