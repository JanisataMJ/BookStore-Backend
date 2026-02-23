const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');


router.get('/authors', authorController.getAuthors);


module.exports = router;  
