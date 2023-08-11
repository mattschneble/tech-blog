// import express router, needed models, and authentification
const router = require("express").Router();
const { BlogPost, Users, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// get all posts from logged in user and render dashboard
router.get("/", withAuth, (req, res) => {
    BlogPost.findAll({
        where: {
            user_id: req.session.user_id
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
            }
        ],
    })

    // render blog posts to dashboard
    .then((dbBlogPostData) => {
        const blogPosts = dbBlogPostData.map((blogPost) =>
            blogPost.get({ plain: true })
        );
        res.render("dashboard", {
            blogPosts,
            loggedIn: true,
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one blog post and render a page to edit it
router.get("/edit/:id", withAuth, (req, res) => {
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
            }
        ],
    })
    .then((dbBlogPostData) => {
        if (!dbBlogPostData) {
            res.status(404).json({ message: "No blog post was found with this id. Please check your id and try again." });
            return;
        }

        const blogPost = dbBlogPostData.get({ plain: true });
        res.render("edit-blogPost", {
            blogPost,
            loggedIn: true,
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// render a page to create a new blog post
router.get("/new", (req, res) => {
    res.render("new-blogPost");
});

// export router
module.exports = router;