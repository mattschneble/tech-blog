// import express router, sequelize and needed models
const router = require("express").Router();
const sequelize = require("../config/connection");
const { BlogPost, Users, Comments } = require("../models");

// get all blog posts
router.get("/", (req, res) => {
    BlogPost.findAll({
        attributes: [
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
            ],
            include: {
            model: Users,
            attributes: ["username"],
            },
        },
        {
            model: Users,
            attributes: ["username"],
        }
        ],
    })

    // render blog posts to homepage
    .then((dbBlogPostData) => {
        const blogPosts = dbBlogPostData.map((blogPost) =>
        blogPost.get({ plain: true })
        );
        res.render("homepage", {
        blogPosts,
        loggedIn: req.session.loggedIn,
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one blog post
router.get("/blogPost/:id", (req, res) => {
    BlogPost.findOne({
        where: {
        id: req.params.id,
        },
        attributes: [
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
            ],
            include: {
            model: Users,
            attributes: ["username"],
            },
        },
        {
            model: Users,
            attributes: ["username"],
        },
        ],
    })

    // render blog post to single post only page
    .then((dbBlogPostData) => {
        if (!dbBlogPostData) {
        res.status(404).json({ message: "No blog post was found with this id. Please check your id and try again." });
        return;
        }
        const blogPost = dbBlogPostData.get({ plain: true });
        res.render("single-post", {
        blogPost,
        loggedIn: req.session.loggedIn,
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// export router
module.exports = router;