const express = require('express');
const router = express.Router();

const account_controller = require('../controllers/Account.controller');

router.get('/get-all-user', account_controller.get_all_user);

router.post('/login', account_controller.account_login);

router.post('/admin/login', account_controller.account_admin_login);

router.post('/signup', account_controller.account_signup);

module.exports = router;