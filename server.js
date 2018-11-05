var express = require('express');
var app = express();
var fs = require("fs");
const axios = require('axios');
const Book = require('./models/book');
const bodyParser = require("body-parser");
const service = require('./services/mongoservice');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/books-library/books", function (req, res) {
    let book = new Book({
      title: req.body.book.title,
      author: req.body.book.author,
      publisher: req.body.book.publisher,
      available: true,
      language: req.body.book.language
    });
    service.save(book);
    res.send(JSON.stringify(book));
});

app.get("/books-library/books", async function (req, res) {
    let books = await service.findAll();
    res.send(books);
});

app.get("/books-library/books/:title", async function (req, res) {
    let books = await service.findByTitle(req.params.title);
    res.send(books);
});

app.delete("/books-library/books/:title", async function (req, res) {
  service.delete(req.params.title);
  res.sendStatus(200);
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
