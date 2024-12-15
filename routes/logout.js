const { Router } = require('express');
const { handleLogout } = require('../controllers/logoutController');

const router = Router();

router.get('/', handleLogout);

module.exports = router;