const Question = require("../model/question");

/**
     * This function get data from req query to search a question
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// search question
exports.searchQuestion = async (req, res) => {
    try {
        const { question } = req.query;
        const searchedData = await Question.aggregate([
            {
                $search: {
                    index: "search-question",
                    text: {
                        query: question,
                        path: "question",
                    },
                },
            },
        ]);

        if (!searchedData) {
            return res.status(404).json({
                status: "Fail",
                message: "Data Not Found",
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Qustion searched Successfully",
            data: searchedData,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};
