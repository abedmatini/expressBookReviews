const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
  return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Validate the username and password
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });

  // Send the token as a response
  return res.status(200).json({ message: "Login successful", token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;

  // Retrieve the review from the request query
  const review = req.query.review;

  // Retrieve the username from the session (assuming the username is stored in the session after login)
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let username;
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    username = decoded.username;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Check if the book exists
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Add or modify the review for the given ISBN and username
  book.reviews[username] = review;

  // Send a success response
  return res.status(200).json({ message: "Review added/modified successfully" });

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
