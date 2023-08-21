const mongoose = require("mongoose");
const logger = require("./log/logger");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.log("info", "conneted to database");
        console.log("Connected to database");
    } catch (err) {
        logger.log("error", `Error connecting to database${err}`);
        console.log(`Error connecting to database${err}`);
    }
};

module.exports = connectToDatabase;
