const express = require('express');
const controller = require('./registerController');
const router = express.Router();

router.get('/',controller.getAllAccounts);

router.post('/register',controller.postAccount);

router.get('/:id', controller.getAccount);

router.put('/update-account/:/id', controller.updateAccount);
module.exports = router;