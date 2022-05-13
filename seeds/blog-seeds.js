const { Blog } = require('../models');

const blogData = [
    {
        title: 'Handlebars',
        post_contents: 'We recently learned about handlebars in school. I am having a hard time understanding how they work. Anyone know of some good documentation to help me grasp this concept?',
        user_id: 1
    },
    {
        title: 'mySQL',
        post_contents: 'mySQL is user friendly. You can create, manipulate, and access databases.',
        user_id: 2
    },
    {
        title: 'When I Grow Up',
        post_contents: 'I hope to work for a reputable company, doing what I love, which is code. I loved developing new products and making old ones better.',
        user_id: 3
    },
    {
        title: 'insomnia',
        post_contents: 'INSOMNIA ROCKS! I love how I can test all of my routes in one central place to make sure they work.',
        user_id: 4
    }
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;