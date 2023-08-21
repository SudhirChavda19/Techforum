const express = require("express");
require("dotenv").config();
const route = require("./route")

const app = express();
const connectDatabase = require("./config");

app.use(route);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();

module.exports = app;
