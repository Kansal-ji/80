const express = require('express');
const router = express.Router();
const { shortenUrl, getStats, redirectToUrl } = require('../controller/urlController');
const authenticate = require('../middleware/auth');

router.post('/shorturls', authenticate, shortenUrl);
router.get('/shorturls/:shortcode', authenticate, getStats);
router.get('/:shortcode', redirectToUrl);

module.exports = router;
