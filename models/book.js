var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: String,
  available: Boolean,
  language: String
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
