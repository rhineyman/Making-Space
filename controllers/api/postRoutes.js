const router = require('express').Router();
const { User, Posts } = require('../../models');
const withAuth = require('../../utils/auth');


// find all posts

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
        ],
      order: [['created_at', 'DESC']],
      include: [
       
        {
          model: User,
          attributes: ['username',]
        },
      ]
    })
      .then(postData => res.json(postData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
//find post by id for claim/delete
  router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                }                
            ]
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//Create new post
router.post('/', withAuth, (req, res) => {
  Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id
      })
      .then(postData => res.json(postData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});
//Update new post

//Delete post??
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
      where: {
          id: req.params.id
      }
  }).then(postData => {
      if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      res.json(postData);
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});
module.exports = router;