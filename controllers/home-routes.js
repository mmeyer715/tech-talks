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
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                }
            ]
        });
        const blogs = await blogData.map(post => post.get({ plain: true }));
        res.render('homepage', { blogs });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/', (req, res) => {
    console.log(req.session);
});

module.exports = router;