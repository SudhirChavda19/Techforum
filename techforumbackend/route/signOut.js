const express = require("express");

const signoutRoutes = express.Router();

signoutRoutes.post("/signout", (req, res) => {
    res.clearCookie("email", { path: "/" });
    res.clearCookie("jwt", { path: "/" }).status(200).json({
        status: 200,
        message: "Signed out successfully",
    });
    // console.log("User: ", req.headers.cookie);
    // // const cookies = req.headers.cookie;
    // res.header.clearCookie("jwt", { path: "/api/users" }).status(200).json({
    //     status: 200,
    //     message: "Signed out successfully",
    // });

    // res.setHeader("Set-Cookie", [
    //     serialize("jwt", "", {
    //         maxAge: -1,
    //         path: "/api/users",
    //     }),
    // ]).status(200).json({
    //     status: 200,
    //     message: "Signed out successfully",
    // });
    // res.end();
});

module.exports = signoutRoutes;
