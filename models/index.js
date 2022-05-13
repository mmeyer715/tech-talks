const User = require('./user');
const Blog = require('./blog');

// user can have many blogs
User.hasMany(Blog, {
    foreignKey: 'user_id'
});

// blog belongs to user
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };