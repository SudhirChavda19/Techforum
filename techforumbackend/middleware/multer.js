const multer = require("multer");
const logger = require("../log/logger");

const multerStorage = multer.memoryStorage();

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        logger.log("error", "Not a PDF File!!");
        cb(new Error("Not a PDF File!!"), false);
    }
};

// Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
}).single("file");

module.exports = upload;
