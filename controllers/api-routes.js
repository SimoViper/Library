const express = require('express');
const service = require('../services/mongoservice');
const Book = require('../models/book');
const router = express.Router();

router.post("/books-library/books", function (req, res) {
    let book = new Book({
      title: req.body.book.title,
      author: req.body.book.author,
      publisher: req.body.book.publisher,
      available: true,
      language: req.body.book.language
    });
    service.save(book);
    res.send(JSON.stringify(book));
})

router.get("/books-library/books", async function (req, res) {

    const title = req.query.title;
    const author = req.query.author;
    
    let books;

    if(title){
       books =  await service.findByTitle(title);
       console.log('title', title);
    }else if(author){
        books = await  service.findByAuthor(author);
        console.log('author', author);
     }else{
        books = await service.findAll();
        console.log('Find All', author);
     }
    
    
    res.send(books);
})

router.get("/books-library/books/:bookId", async function (req, res) {
    console.log('Id', req.params.bookId);
    let books = await service.findById(req.params.bookId);
    res.send(books);
})

router.delete("/books-library/books/:id", async function (req, res) {
    service.delete(req.params.id);
    res.sendStatus(200);
  })

module.exports = router;