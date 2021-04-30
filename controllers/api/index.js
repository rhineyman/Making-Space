const router = require('express').Router();

const otherRoute = require('./other');

router.use('/users', otherRoute);

module.exports = router;