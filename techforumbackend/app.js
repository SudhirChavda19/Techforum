const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const signinRoutes = require("./route/signIn");
const bookmarkRoutes = require("./route/bookmark");
const signupRoutes = require("./route/signUp");
const signoutRoutes = require("./route/signOut");
const forgotpasswordRoutes = require("./route/forgetPassword");
const serchRoutes = require("./route/search");
const questionRoutes = require("./route/question");
const blogRoutes = require("./route/blog");
const documentRoutes = require("./route/doc");
const answerRoutes = require("./route/answer");
const manageUsersRoutes = require("./route/manageuser");
const tagsRoutes = require("./route/manageTag");
const manageResourcesRoutes = require("./route/manageResource");
const logger = require("./logs/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.log("info", "conneted to database");
        console.log("Connected to database");
    } catch (err) {
        logger.log("error", "err");

        console.log(`Error connecting to database${err}`);
    }
};
connectToDatabase();
app.use("/api", signupRoutes);

app.use("/api/forgotpassword", forgotpasswordRoutes);

app.use(
    "/api/users",
    signoutRoutes,
    signinRoutes,
    bookmarkRoutes,
    questionRoutes,
    serchRoutes,
    blogRoutes,
    documentRoutes,
    answerRoutes,
    tagsRoutes,
);

app.use("/api/admin", manageUsersRoutes, tagsRoutes, manageResourcesRoutes);

module.exports = app;
