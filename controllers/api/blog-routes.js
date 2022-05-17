// required packages
const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// get all posts
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: [
                'title',
                'post_contents',
                'created_at'
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                   model: Comment,
                   attributes: ['comment_text', 'created_at'],
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
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get one post 
router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'title',
                'post_contents',
                'created_at'
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                   model: Comment,
                   attributes: ['comment_text', 'created_at'],
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
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const blogData = await Blog.create({
        title: req.body.title,
        post_contents: req.body.post_contents,
        user_id: req.body.user_id
        });
        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;