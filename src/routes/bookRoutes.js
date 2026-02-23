const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books/joinCatAu', bookController.getAllBooksFlagUse);
router.post('/books', bookController.createBook);
router.get('/books/:id', bookController.getBookID);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

router.get('/bookstotal', bookController.getTotalBooks);

module.exports = router;  