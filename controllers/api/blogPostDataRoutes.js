// import express router, needed models and authentification
const router = require("express").Router();
const { BlogPost, Users, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// get all blog posts
router.get("/", (req, res) => {
    BlogPost.findAll({
        attributes: [
            "id", 
            "title", 
            "content", 
            "created_at"
    ],
        order: [["created_at", "DESC"]],
        include: [
        {
            model: Comments,
            attributes: [
                "id", 
                "comment_text", 
                "blogPost_id", 
                "user_id", 
                "created_at"
            ],
            include: {
            model: User,
            attributes: ["username"],
            },
        },
        {
            model: User,
            attributes: ["username"],
        }
        ],
    })
        .then((dbBlogPostData) => res.json(dbBlogPostData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

// get one blog post
router.get("/:id", (req, res) => {
    BlogPost.findOne({
        where: {
        id: req.params.id,
        },
        attributes: 
        [
            "id",
            "title",
            "content",
            "created_at"
        ],
        include: [
        {
            model: Comments,
            attributes: [
                "id",
                "comment_text",
                "blogPost_id",
                "user_id",
                "created_at"
        ]
        },
        {
            model: User,
            attributes: ["username"],
        },
        ],
    })
        .then((dbBlogPostData) => {
        if (!dbBlogPostData) {
            res.status(404).json({ message: "No blog post has been found with this id" });
            return;
        }
        res.json(dbBlogPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });

// create a blog post
router.post("/", withAuth, (req, res) => {
    BlogPost.create(
        {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
        }
    )
        .then((dbBlogPostData) => res.json(dbBlogPostData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

// update a blog post
router.put("/:id", withAuth, (req, res) => {
    BlogPost.update(
        {
        title: req.body.title,
        content: req.body.content,
        },
        {
        where: {
            id: req.params.id,
        },
        }
    )
        .then((dbBlogPostData) => {
        if (!dbBlogPostData) {
            res.status(404).json({ message: "No blog post has been found with this id, and no update has been made. Please use a valid id." });
            return;
        }
        res.json(dbBlogPostData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

// delete a blog post
router.delete("/:id", withAuth, (req, res) => {
    BlogPost.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then(dbBlogPostData => {
            if (!dbBlogPostData) {
                res.status(404).json({ message: "No blog post has been found with this id, and no delete has been performed. Please use a valid id." });
                return;
            }
            res.json(dbBlogPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

// export router
module.exports = router;