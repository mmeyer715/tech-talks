// required packages
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');


// route to render the createblog page
router.get('/createblog', (req, res) => {
    res.render('create-blog', {loggedIn: req.session.loggedIn});
});

// finds all current blogs and renders them to the homepage
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


// when user clicks on a blog title from homepage, route renders the select blog post
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
        res.render('single-blog', { blog, loggedIn: req.session.loggedIn })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } 
});

// renders the login page, and starts session if user login is successful, if successful user will be redirected to dashboard, if unsuccessful user will be routed back to login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', {loggedIn: req.session.loggedIn});
});

router.get('/', (req, res) => {
    console.log(req.session);
});

module.exports = router;