const express = require('express');
const router = express.Router();
const UploadsControllers = require('../controllers/upload');
const { uploadModule } = require('../service/uploadHnadle');

router.get('/uploads', UploadsControllers.getAllImage);
router.post('/upload', uploadModule.single('image'), UploadsControllers.uploadImage);
router.delete('/uploads', UploadsControllers.deleteAllImage);

module.exports = router