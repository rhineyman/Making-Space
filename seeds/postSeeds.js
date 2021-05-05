const { Post } = require('../models');

const postData = [{
    title: 'Love Seat',
    content: 'Its a brown love seat, slightly loved!',
    location: '',
    user_id: 1,
    category_id: 'furniture'
},
{
    title: 'Closet Swap!',
    content: 'My closet is full of clothes I dont wear anymore. Maybe I have something you want!',
    location: '',
    user_id: 2,
    category_id: 'clothes'
},
{
    title: 'Blender',
    content: 'It blends.',
    location: '',
    user_id: 1,
    category_id: 'miscellaneous'
}
];

const postSeeds = () => Post.bulkCreate(postData);
module.exports = postSeeds;