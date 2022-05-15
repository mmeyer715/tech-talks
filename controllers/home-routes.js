// required packages
const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            attributes: [
                'title',
                'post_contents',
                'created_at'
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                }
            ]
        });
        const blogs = (await blogData).map(post => post.get({ plain: true }));
        res.render('homepage', { blogs });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;