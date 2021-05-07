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
        console.log(req.session.logged_in);
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
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

  router.get('/homepage/create/', (req, res) => {
    res.render('create');
  });

  router.get('/homepage', (req, res) => {
    res.render('homepage', {logged_in: req.session.logged_in});
  });


  module.exports = router;