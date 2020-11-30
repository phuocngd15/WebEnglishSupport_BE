const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('Get something');
  res.json({ message: 'it work!' });
});
module.exports = router;
