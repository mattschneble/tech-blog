// import express router, needed models and authentification
const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// get all comments
router.get("/", (req, res) => {
    Comments.findAll({
        attributes: [
            "id", 
            "comment_text", 
            "blogPost_id", 
            "user_id", 
            "created_at"
        ],
        order: [["created_at", "DESC"]],
        include: [
        {
            model: User,
            attributes: ["username"],
        }
        ],
    })
        .then((dbCommentsData) => res.json(dbCommentsData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    });

// post a comment
router.post('/', withAuth, (req, res) => {
    // use session to see if the user is logged in
    if (req.session) {
        Comments.create({
            comment_text: req.body.comment_text,
            blogPost_id: req.body.blogPost_id,
            user_id: req.session.user_id
        })
        .then(dbCommentsData => res.json(dbCommentsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// delete a comment
router.delete('/:id', (req, res) => {
    Comments.destroy({
        where: {
            id: req.params.id
        }
})
    .then(dbCommentsData => {
        if (!dbCommentsData) {
            res.status(404).json({message: "No comment has been found with this id, and no deletion has occurred. Please try again."});
            return;
        }
        res.json(dbCommentsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// export the router
module.exports = router;