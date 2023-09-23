const express = require('express');
const router = express.Router();

const keyword_controller = require('../controllers/Keyword.controller');

router.get('/filter', keyword_controller.keyword_extraction);

module.exports = router;