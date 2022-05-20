// required packages
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.get('/createblog', (req, res) => {
    res.render('create-blog');
});

router.get('/', async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            attributes: [
                'id',
                'title',
                'post_contents',
                'created_at'
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['user_name']
                    }
                },
                {
                    model: User,
                    attributes: ['user_name']
                }
            ]
        });
        const blogs = await blogData.map(post => post.get({ plain: true }));
        res.render('homepage', { blogs, loggedIn: req.session.loggedIn });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/blogs/:id', async  (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'post_contents',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['user_name']
                    }
                },
                {
                    model: User,
                    attributes: ['user_name']
                }
            ]
        });
        if(!blogData) {
            res.status(404).json({message: 'No user found with that id!'})
            return;
        }
        const blog = await blogData.get({ plain: true });
        res.render('single-blog', { blog })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
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