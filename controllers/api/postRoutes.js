const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');


// find all posts

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'user_id',
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
                'user_id',
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
router.post('/', (req, res) => {
  console.log('im here')
  Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id
      })
      .then(postData => {console.log(postData);
        res.json(postData)})
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