const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const uploadSingle = require('../middlewares/uploadMiddleware');

const {
    uploadFile
} = require('../controllers/uploadController');

const router = express.Router();

router.post(
    '/upload',
    authMiddleware,
    uploadSingle,
    uploadFile
);

module.exports = router;