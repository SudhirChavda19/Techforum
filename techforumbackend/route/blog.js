const express = require("express");

const blogRoutes = express.Router();
const auth = require("../middleware/auth");
const blogController = require("../controller/blog");
const validator = require("../middleware/validator");

blogRoutes.get("/blog", validator.getByPaginationValidation(), validator.validate, auth.auth, blogController.blogs);

blogRoutes.get("/blog/:id", validator.getBlogByIdValidation(), validator.validate, auth.auth, blogController.blog);

blogRoutes.get("/blogbyuser/:userId", validator.getByUserIdValidation(), validator.validate, auth.auth, blogController.getBlog);

blogRoutes.get("/blogtitle", blogController.getBlogTitle);

blogRoutes.post("/blog", validator.postBlogValidation(), validator.validate, auth.auth, blogController.createBlog);

blogRoutes.delete("/blog/:id", validator.deleteBlogValidation(), validator.validate, auth.auth, blogController.deleteBlog);

blogRoutes.patch("/blog/:id", validator.updateBlogValidation(), validator.validate, auth.auth, blogController.updateBlog);

module.exports = blogRoutes;
