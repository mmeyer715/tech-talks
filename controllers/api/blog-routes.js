// required packages
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Blog, User } = require('../../models');

// get all posts
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: [
                'title',
                'post_contents',
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                }
            ]
        });
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;