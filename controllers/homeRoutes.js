const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, } = require('../models');


router.get('/', (req, res) => {
    console.log(req.session);
    
    Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts);
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.get('/create', (req, res) => {
    res.render('create');
  });

  router.get('/homepage', (req, res) => {
    res.render('homepage');
  });


  module.exports = router;