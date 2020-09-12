const express = require('express');
const controller = require('./registerController');
const router = express.Router();

router.get('/',controller.getAllAccounts);

router.post("/register",controller.postAccount);

module.exports = router;