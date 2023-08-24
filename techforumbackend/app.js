const express = require("express");
require("dotenv").config();
const route = require("./route")
const cors = require("cors");

const app = express();
const connectDatabase = require("./config");

const corsOptions = {
    origin: "http://localhost:4200",
    methods: ["GET", "PATCH", "POST", "DELETE"],
    withCredentials: true,
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
};

const allowCrossDomain = (req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "https://main--techforum.netlify.app",
    );
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
};
app.use(allowCrossDomain);
app.use(cors({ origin: true }));
app.use(cors(corsOptions));
app.options(
    "*",
    cors({
        origin: "https://main--techforum.netlify.app",
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);

connectDatabase();

module.exports = app;
