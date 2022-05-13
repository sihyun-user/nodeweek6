const express = require('express');
const router = express.Router();
const UploadsControllers = require('../controllers/uploads');
const { uploadModule } = require('../service/uploadHnadle');

router.get('/', UploadsControllers.getImages);
router.post('/', uploadModule.single('image'), UploadsControllers.uploadImages);

module.exports = router