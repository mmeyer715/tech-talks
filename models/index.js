const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');

// user can have many blogs
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// blog belongs to user
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

// comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// comment belongs to post
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
});

// user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// blog has many comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };