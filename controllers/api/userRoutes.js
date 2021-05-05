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
    const userData = await User.create(req.body);
    try{
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
    finally{
        if (!userData){
            res.json("Make sure to add the required information for creating a new user");
        }
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

module.exports = router;