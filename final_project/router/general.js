const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }



 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookKeys = Object.keys(books);
  const booksByAuthor = [];
    // Iterate through the books object and check if the author matches
    bookKeys.forEach(key => {
      if (books[key].author === author) {
        booksByAuthor.push(books[key]);
      }
    });
  
    // Check if any books were found
    if (booksByAuthor.length > 0) {
      // Send the list of books as a JSON response
      return res.status(200).json(booksByAuthor);
    } else {
      // Send a 404 response if no books were found
      return res.status(404).json({ message: "No books found by this author" });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookKeys = Object.keys(books);
  const booksByTitle = [];
  bookKeys.forEach(key => {
    if (books[key].title === title) {
      booksByTitle.push(books[key]);
    }
  });

  // Check if any books were found
  if (booksByTitle.length > 0) {
    // Send the list of books as a JSON response
    return res.status(200).json(booksByTitle);
  } else {
    // Send a 404 response if no books were found
    return res.status(404).json({ message: "No books found with this title" });
  }



});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
