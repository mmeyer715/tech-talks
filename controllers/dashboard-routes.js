const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// find all blogs of logged in user 
router.get('/', withAuth, async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
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
        res.render('dashboard', { blogs, loggedIn: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// find blog with specified id and render edit form
router.get('/edit/:id', async  (req, res) => {
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
        res.render('edit-blog', { blog, loggedIn: true })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } 
});


module.exports = router;