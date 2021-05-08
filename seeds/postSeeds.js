const { Post } = require('../models');

const postData = [{
    title: 'Love Seat',
    content: 'Its a brown love seat, slightly loved!',
    user_id: 1
},
{
    title: 'Closet Swap!',
    content: 'My closet is full of clothes I dont wear anymore. Maybe I have something you want!',
    user_id: 2
},
{
    title: 'Blender',
    content: 'It blends.',
    user_id: 1
}
]

const postSeeds = () => Post.bulkCreate(postData);
module.exports = postSeeds;