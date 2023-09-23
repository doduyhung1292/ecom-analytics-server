const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/Category.controller');

router.get('/', category_controller.get_category);

router.get('/get-all-category', category_controller.get_all_category);

router.get('/renew', category_controller.renew_category);

module.exports = router;