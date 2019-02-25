const express = require('express');
const service = require('../services/mongoservice');
const Book = require('../models/book');
const router = express.Router();
const Validator = require('jsonschema').Validator;
const v = new Validator();
const schema = {
    "id": "/Book",
    "type": "object",
    "properties": {
      "title": {"type": "string", "required": true },
      "author": {"type": "string", "required": true },
      "publisher": {"type": "string"}
    }
  };


router.post("/books-library/books", function (req, res) {
    const val = v.validate(req.body, schema);

    val.errors.forEach(error => {
        let index = error.stack.indexOf('.');
        console.log('Message: ', error.stack.substring(index + 1));
    });

    let book = new Book({
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      available: true,
      language: req.body.language
    });
    service.save(book);
   res.send(JSON.stringify(book));
   res.sendStatus(200);
})

router.get("/books-library/books", async function (req, res) {

    const title = req.query.title;
    const author = req.query.author;
    
    let books;

    if(title){
       books =  await service.findByTitle(title);
    }else if(author){
        books = await service.findByAuthor(author);
     }else{
        books = await service.findAll();
     }
    
    
    res.send(books);
})

router.get("/books-library/books/:bookId", async function (req, res) {
    console.log('Id', req.params.bookId);
    let books = await service.findById(req.params.bookId);
    res.send(books);
})

router.delete("/books-library/books/:bookId", async function (req, res) {
    service.delete(req.params.bookId);
    res.sendStatus(200);
  })

module.exports = router;