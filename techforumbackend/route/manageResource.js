const express = require("express");

const manageResourcesRoutes = express.Router();
const manageResourcesController = require("../controller/manageResource");
const validator = require("../middleware/validator");

manageResourcesRoutes.patch(
    "/approveblog/:id",
    validator.approveResourceValidation(),
    validator.validate,
    manageResourcesController.approveBlog,
);
manageResourcesRoutes.patch(
    "/approvedoc/:id",
    validator.approveResourceValidation(),
    validator.validate,
    manageResourcesController.approveDocument,
);

manageResourcesRoutes.get("/blog", validator.getByPaginationValidation(), validator.validate, manageResourcesController.blogs);

manageResourcesRoutes.get("/document", validator.getByPaginationValidation(), validator.validate, manageResourcesController.getDocument);

module.exports = manageResourcesRoutes;
