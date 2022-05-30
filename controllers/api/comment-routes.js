const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: [
                'id',
                'comment_text',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['user_name']
            }
        });
        res.status(200).json(commentData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

// create new comment
router.post('/', withAuth, (req, res) => {
    try {
        const commentData = Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        });
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// delete comment
router.delete('/:id', withAuth, (req, res) => {
    try {
        const commentData = Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id!'});
            return;
        }
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;