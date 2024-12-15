const { Router } = require('express');
const { handleRefreshToken } = require('../controllers/refreshTokenController');

const router = Router();

router.get('/', handleRefreshToken);

module.exports = router;