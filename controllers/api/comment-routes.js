const router = require('express').Router();
const { Comment } = require('../../models');

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
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            blog_id: req.body.blog_id
        });
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// delete comment
router.delete('/', (req, res) => {

});

module.exports = router;