// import express router, associated routes
const router = require("express").Router();
const userDataRoutes = require("./usersDataRoutes");
const blogPostDataRoutes = require("./blogPostDataRoutes");
const commentDataRoutes = require("./commentDataRoutes");

// prefix associated routes with associated path
router.use("/users", userDataRoutes);
router.use("/blogPost", blogPostDataRoutes);
router.use("/comments", commentDataRoutes);

// export router
module.exports = router;