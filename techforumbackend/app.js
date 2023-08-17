const express = require("express");
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
const manageUsersRoutes = require("./route/manageUser");
const tagsRoutes = require("./route/manageTag");
const manageResourcesRoutes = require("./route/manageResource");
const connectDatabase = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();
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
