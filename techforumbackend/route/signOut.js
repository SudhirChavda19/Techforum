const express = require("express");

const signoutRoutes = express.Router();

signoutRoutes.post("/signout", (req, res) => {
  try {
    // const expirationTime = new Date(Date.now() + 0);
    // const expiredCookieString = `jwt=; HttpOnly; Expires=${expirationTime.toUTCString()}; Path=/`;
    // res.setHeader("Set-Cookie", expiredCookieString);
    // return res.status(200).json({
    //   status: 200,
    //   message: "Signed out successfully",
    // });
    res.clearCookie("email", { path: "/" });
    res.clearCookie("jwt", { path: "/" }).status(200).json({
        status: 200,
        message: "Signed out successfully",
    });
  } catch (err) {
    logger.log("error", `Server Error: ${err}`);
        return res.status(500).json({
            status: "Fail",
            error: "Server Error",
        });
  }

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
