const express = require('express');
var multer = require('multer');

const router = express.Router();
const upload = require('../middleware/multer');
const {
  createNews,
  getAllNews,
  getSingleNews,
  getNewsByCategory,
  searchPosts,
} = require('../controllers/newsController');
const {validator,result, validateFile } = require('../middleware/validatorr');

router.post(
  '/create',
  upload.single('thumbnail'),
  validator,
  result,
  validateFile,
  createNews
);

router.get('/news', getAllNews);
router.get('/news/single/:id', getSingleNews);
router.get('/news/:category/:qty?', getNewsByCategory);
router.post('/news/search/:query', searchPosts);

module.exports = router;
