const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/Product.controller');

router.get('/filter', product_controller.product_filter);


module.exports = router;