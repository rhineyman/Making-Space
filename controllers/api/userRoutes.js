const router = require('express').Router();
const { User, Posts } = require('../../models');//Make sure both User and Posts work

//Gets single user
router.get('/:id', async (req, res) => {
    const userData = await User.findByPk(req.params.id)
    const allPosts = await Posts.findByPk(req.params.id);
    try{
        //Displays all posts by User
        
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
    finally{
        if (!userData){
            res.status(404).json("No User found with this id");
            //Add option to add new user (Or direct back to login)
        }
        res.status(200).json(userData);
    }
});

//Create new user
router.post('/', async (req, res) => {
    try{
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
        res.status(200).json(userData);
        })
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
    finally{
        console.log("hello")
    }
});

//Update User info
router.put('/:id', async (req, res) => {
    const userData = await User.update(req.body, {
        where: {
            id: req.params.id,
        },
        individualHooks: true
    });
    try{
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
    finally{
        if (!userData){
            //May delete this 'finally' part
        }
    }
});

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        res.status(400).json({ message: 'No user account found!' });
        return;
      }
      const validPassword = user.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'No user account found!' });
        return;
      }
      req.session.save(() => {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.logged_in = true;
        res.json({ user, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json({ message: 'No user account found!' });
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;