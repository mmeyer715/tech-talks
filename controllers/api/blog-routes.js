// required packages
const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// get all posts
router.get('/', async (req, res) => {
    try {
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
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get one blog 
router.get('/:id', async (req, res) => {
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
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// create blog
router.post('/', async (req, res) => {
    try {
        const blogData = await Blog.create({
        title: req.body.title,
        post_contents: req.body.post_contents,
        user_id: req.session.user_id
        });
        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update blog post
router.put('/:id', async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!blogData) {
            res.status(404).json({message: 'No blog found with that id!'});
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete selected blog post
router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id 
            }
        });
        if (!blogData) {
            res.status(404).json({message: 'No blog found with that id!'})
        }
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;