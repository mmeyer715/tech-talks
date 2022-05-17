const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Handlebars might be difficult to grasp at first, but once you get it, it will make full stack projects. Here is a link to the handlebars documentation website https://handlebarsjs.com/',
        user_id: 4,
        blog_id: 1
    },
    {
        comment_text: 'Completely agree! Its a great way to manage local databases',
        user_id: 3,
        blog_id: 2
    },
    {
        comment_text: 'These are great aspirations to have! Keep it up!',
        user_id: 2,
        blog_id: 3
    },
    {
        comment_text: 'I have not used insomnia. I use PostMan to test all of my routes',
        user_id: 1,
        blog_id: 4
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
