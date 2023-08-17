const Document = require("../model/doc");
const logger = require("../log/logger");

/**
     * This function fetch all the documents
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// get all posted documents
exports.getDocument = async (req, res) => {
    try {
        const docsdata = await Document.find().populate([
            {
                path: "userId",
            },
        ]);
        console.log(docsdata);
        logger.log("info", "Succesfully got all Documents");
        return res.status(201).json({
            status: "Success",
            message: "Succesfully got all Documents",
            data: docsdata,
        });
    } catch (error) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get data from req param to fetch a specific document using document id
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// get a specific document
exports.getDocuments = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await Document.findById(id).populate([
            {
                path: "userId",
            },
        ]);
        console.log(doc);
        if (!doc) {
            logger.log("error", "Document not found!");
            return res.status(404).json({
                status: "Fail",
                message: "Document not found!",
            });
        }
        logger.log("info", "Succesfully got the Document");
        return res.status(201).json({
            status: "Success",
            message: "Succesfully got the Document",
            data: doc,
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
     * This function get data from req body to post/create a document
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// post a new document
exports.postDocument = async (req, res) => {
    if (!req.file) {
        logger.log("error", "No file uploaded");
        return res.status(400).json({
            status: "Fail",
            message: "No file uploaded",
        });
    }
    try {
        const { userId } = req.body;
        const fileName = req.file.originalname;
        const fileType = req.file.mimetype;
        const docData = req.file.buffer;
        const document = await Document.create({
            fileName,
            fileType,
            docData,
            userId,
        });
        logger.log("info", "Succesfully posted a Document");
        return res.status(201).json({
            status: "Success",
            message: "Succesfully posted a Document",
            data: document,
        });
    } catch (error) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};

/**
     * This function get data from req param to delete a document
     * @param {Object} req req contain data that comes from client
     * @param {Object} res res send response to client
     * @returns {Object} server will return response in json object
     */
// delete an existing document
exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteD = await Document.findByIdAndDelete(id);
        if (!deleteD) {
            logger.log("error", "Already deleted!");
            return res.status(404).json({
                status: "Fail",
                message: "Already deleted!",
            });
        }
        logger.log("info", "Succesfully deleted Document");
        return res.status(201).json({
            status: "Success",
            message: "Succesfully deleted Document",
        });
    } catch (err) {
        logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            message: "Server Error",
        });
    }
};
