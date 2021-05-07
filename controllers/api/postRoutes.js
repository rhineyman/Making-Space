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


//Create new post

//Update new post

//Delete post??

module.exports = router;