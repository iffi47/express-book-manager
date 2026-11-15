const express = require("express");
const Book = require("../models/Book");

const bookRouter = express.Router();

//Routes
bookRouter.post("/", async (req, res) => {
 //req.body===the data user wants to save
 // console.log(req.body)
 try {
  const { title, author, isAvailable, publishedYear, genre } = req.body;
  //Check for duplicates
  const existingBook = await Book.findOne({ title, author });
  if (existingBook) {
   return res.status(409).json({ error: "Book already existed!" });
  }
  const book = await Book.create({
   title,
   author,
   genre,
   publishedYear,
   isAvailable,
  });
  return res.status(201).json(book);
 } catch (error) {
  return res.status(400).json({ error: error.message });
 }
});
//Fetch all books

bookRouter.get("/", async (req, res) => {
 try {
  const books = await Book.find();
  // console.log(books);
  res
   .status(200)
   .json({ message: "Fetch details successfully!", body: { books } });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});
//Fetch a single book
bookRouter.get("/:bookId", async (req, res) => {
 try {
  const book = await Book.findById(req.params.bookId);
  res.status(200).json({ message: "All Books!", book });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});
//Delete the Book
bookRouter.delete("/:bookId", async (req, res) => {
 try {
  await Book.findByIdAndDelete(req.params.bookId);
  res.status(200).json({ message: "Book is deleted!" });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});
//Update the Book
bookRouter.put("/:bookId", async (req, res) => {
 try {
  const bookUpdated = await Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true});
  res.status(200).json({ message: "Book is updated!" });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});

module.exports = bookRouter;