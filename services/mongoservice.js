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

  findByTitle: function(title) {
    return Book.find({"title": title}).limit(100).exec();
  },

  delete: function(title) {
    let book = Book.find({ "title": title }).deleteOne().exec();
    console.log("Book successfully Deleted");
  }
};
