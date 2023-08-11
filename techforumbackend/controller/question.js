const Question = require("../model/question");
const Bookmark = require("../model/bookmark");
const Answer = require("../model/answer");

/**
     * This function accept data and create question
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// post a question
exports.createQuestion = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(404).json({
            status: 404,
            message: "Data not Found",
        });
    }
    let { userId } = req.body;
    let { question } = req.body;
    const { questionDescribe } = req.body;
    const { tags } = req.body;
    const createdAt = Date.now();

    if (userId === undefined) {
        return res.status(400).json({
            status: 400,
            message: "UserId not found",
        });
    }
    userId = userId.trim();
    if (userId.length === 0) {
        return res.status(400).json({
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
    if (question === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Question not found",
        });
    }
    question = question.trim();
    if (question.length === 0) {
        return res.status(400).json({
            status: 400,
            message: "Question can't be empty",
        });
    }

    if (questionDescribe !== undefined) {
        if (questionDescribe.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Question Describe can't be empty",
            });
        }
    }
    if (tags !== undefined) {
        if (tags.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Tags can't be empty",
            });
        }
        if (!Array.isArray(tags)) {
            return res
                .status(400)
                .json({
                    status: 400,
                    message: "tags must be in Array",
                });
        }
    }

    const questionData = await Question.findOne({ question });
    if (questionData !== null) {
        if (questionData.question === question) {
            return res.status(400).json({
                status: 400,
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
        return res.status(201).json({
            status: 201,
            message: "Question created successfully",
            data: questionCreated,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// question pagination
exports.questionPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 8;
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
            return res.status(404).json({
                status: 404,
                message: "please decrease the limit or page",
            });
        }

        const totalPages = Math.ceil(count / limit);
        const hasMore = page < totalPages;

        if (!questionsData) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Questions Readed successfully",
            data: questionsData,
            nbHits: questionsData.length,
            totalPages,
            hasMore,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// read the questions from database
exports.readQuestions = async (req, res) => {
    try {
        const questionsData = await Question.find().populate([
            {
                path: "userId",
            },
        ]);
        if (!questionsData) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Questions Readed successfully",
            data: questionsData,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};
// get a speific question by question id
exports.readByIdQuestion = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid question id",
            });
        }
        const questionData = await Question.findById({ _id: id }).populate([
            {
                path: "userId",
            },
        ]);

        if (!questionData) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found, Please enter valid question id",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Question Readed successfully",
            data: questionData,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// get a speific question by user id
exports.readByIdUser = async (req, res) => {
    try {
        let { userId } = req.params;
        if (userId === undefined) {
            return res.status(400).json({
                status: 400,
                message: "Enter the user Id ",
            });
        }

        userId = userId.trim();
        if (userId.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid user id",
            });
        }
        const questionData = await Question.find({ userId }).populate([
            {
                path: "userId",
            },
        ]);

        if (!questionData) {
            return res.status(400).json({
                status: 400,
                message: "Data Not Found, Please enter valid user Id",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Question Readed successfully",
            data: questionData,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// update perticular question
exports.updateQuestion = async (req, res) => {
    try {
        if (req.params === undefined) {
            return res.status(404).json({
                status: 404,
                message: "Enter the question id",
            });
        }

        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid question id",
            });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Data not Found",
            });
        }

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
            return res.status(400).json({
                status: 400,
                message: "Data Not Found, Enter valid id",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Question Updated Successfully",
            data: updateQuestion,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// delete perticular question
exports.deleteQuestion = async (req, res) => {
    try {
        if (req.params === undefined) {
            return res.status(402).json({
                status: 402,
                message: "Enter the question Id",
            });
        }

        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid question id",
            });
        }

        const deleteQuestion = await Question.findByIdAndDelete(id);
        if (!deleteQuestion) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found, Enter valid id",
            });
        }
        await Bookmark.deleteMany({ questionId: id });
        await Answer.deleteMany({ questionId: id });
        return res.status(200).json({
            status: 200,
            message: "Question Deleted Successfully",
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};
