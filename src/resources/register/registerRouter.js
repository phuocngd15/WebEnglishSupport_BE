const express = require('express');
const controller = require('./registerController');
const router = express.Router();

// api/register
router
  .route('/')
  .get('/', controller.getAllAccounts)
  .post('/register', controller.postAccount)
  .get('/:id', controller.getAccount)
  .put('/update-account/:/id', controller.updateAccount);

module.exports = router;
