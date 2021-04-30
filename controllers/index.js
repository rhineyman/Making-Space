const router = require('exoress').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;