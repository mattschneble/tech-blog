// import express router, needed models, and authentification
const router = require("express").Router();
const { BlogPost, Users, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
    Users.findAll({
        attributes: { exclude: ["password"] },
    })
        .then((dbUsersData) => res.json(dbUsersData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

// get one user
router.get("/:id", (req, res) => {
    Users.findOne({
        attributes: { exclude: ["password"] },
        where: {
        id: req.params.id,
        },
        include: [
        {
            model: BlogPost,
            attributes: [
                "id", 
                "title", 
                "content", 
                "created_at"
            ],
        },
        {
            model: Comments,
            attributes: [
                "id", 
                "comment_text", 
                "created_at"
            ],
            include: {
            model: BlogPost,
            attributes: ["title"],
            },
        },
        {
            model: BlogPost,
            attributes: ["title"],
        },
        ],
    })
        .then((dbUsersData) => {
        if (!dbUsersData) {
            res.status(404).json({ message: "No user was found with this id. Please check your id and try again." });
            return;
        }
        res.json(dbUsersData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

// create a user
router.post("/", (req, res) => {
    Users.create({
        username: req.body.username,
        password: req.body.password,
    })
        .then((dbUsersData) => {
        req.session.save(() => {
            req.session.user_id = dbUsersData.id;
            req.session.username = dbUsersData.username;
            req.session.loggedIn = true;
            res.json(dbUsersData);
        });
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

// create route used to login
router.post("/login", (req, res) => {
    Users.findOne({
        where: {
        username: req.body.username,
        },
    }).then((dbUsersData) => {
        if (!dbUsersData) {
        res.status(400).json({ message: "No user with that username. Please try again." });
        return;
        }

        const approvedPassword = dbUsersData.checkPassword(req.body.password);

        if (!approvedPassword) {
        res.status(400).json({ message: "Incorrect password. Please try again." });
        return;
        }

        req.session.save(() => {
        req.session.user_id = dbUsersData.id;
        req.session.username = dbUsersData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUsersData, message: "Success! You have been logged in!" });
        });
    });
});

// create route used to logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});