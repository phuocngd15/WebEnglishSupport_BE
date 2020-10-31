const express = require('express');
const controller = require('./examController');
const router = express.Router();

router.post('/',controller.upload.single('file'),controller.postExam);
router.get('/', controller.getExam);
