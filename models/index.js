// import models
const Users = require('./users');
const BlogPost = require('./blogpost');
const Comments = require('./comments');

// create associations

// One User can have many blog posts
Users.hasMany(BlogPost, {
    foreignKey: 'user_id'
});

// One blog post belongs to one User
BlogPost.belongsTo(Users, {
    foreignKey: 'user_id'
});

// One User can have many comments
Users.hasMany(Comments, {
    foreignKey: 'user_id'
});

// One comment belongs to one User
Comments.belongsTo(Users, {
    foreignKey: 'user_id'
});

// One blog post can have many comments
BlogPost.hasMany(Comments, {
    foreignKey: 'blogpost_id'
});

// One comment belongs to one blog post
Comments.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id'
});

// export modules
module.exports = { 
    Users,
    BlogPost,
    Comments
};