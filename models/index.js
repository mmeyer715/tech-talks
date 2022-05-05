const User = require('./user');
const Blog = require('./blog');

// blog belongs to user
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

// user can have many blogs
User.hasMany(Blog, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };