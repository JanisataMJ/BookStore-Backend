const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Define routes
/*router.get('/books', bookController.getAllBooks);
router.post('/books', bookController.createBook);*/
router.get('/books/joinCatAu', bookController.getAllBooksFlagUse);
router.post('/books', bookController.createBook);
router.get('/books', bookController.getBookID);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;