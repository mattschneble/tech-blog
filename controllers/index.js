// import express router, associated routes
const router = require("express").Router();
const apiRouting = require("./api");
const homeRoute = require("./homeRoutes");
const dashboardRoute = require("./dashboardRoutes");

// prefix associated routes with associated path
router.use("/", homeRoute);
router.use("/api", apiRouting);
router.use("/dashboard", dashboardRoute);

// use routes
router.use((req, res) => {
    res.status(404).end();
});

// export router
module.exports = router;