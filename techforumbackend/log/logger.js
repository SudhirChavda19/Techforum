const path = require("path");
// const winston = require("winston");
const { createLogger, format, transports } = require("winston");

const {
    combine, timestamp, printf,
} = format;

const myFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message} `);

const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        myFormat,
    ),
    defaultMeta: { service: "user-service" },
    transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
        new transports.File({ filename: path.join(__dirname, "error.log"), level: "info" }),
        // new winston.transports.File({ filename: "combined.log" }),
    ],
});

module.exports = logger;
