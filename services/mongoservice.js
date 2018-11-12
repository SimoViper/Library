const Book = require('../models/book');

module.exports = {

  save: function(book) {
    book.save(function(err) {
      if (err) throw err;
      return book;
    });
  },

  findAll: function() {
    return Book.find({}).limit(100).exec();
  },

  findById: function(bookId){
    return  Book.findById(bookId).limit(1).exec();
  },

  findByTitle: function(title) {
    return Book.find({"title": title}).limit(100).exec();
  },

  findByAuthor: function(author) {
    return Book.find({"author": author}).limit(100).exec();
  },

  delete: function(id) {
    console.log("Book successfully Deleted");
  }
};
