const { Router } = require('express');
const { join } = require('path');

const router = Router();

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;