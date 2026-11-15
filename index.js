require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");
//!express instance

const app = express();
const PORT = 5000;
//Middlewares
app.use(express.json());
//Routes
app.post("/api/v1/books", async (req, res) => {
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

app.get("/api/v1/books", async (req, res) => {
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
app.get("/api/v1/book/:bookId", async (req, res) => {
 try {
  const book = await Book.findById(req.params.bookId);
  res.status(200).json({ message: "All Books!", book });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});
//Delete the Book
app.delete("/api/v1/book/:bookId", async (req, res) => {
 try {
  await Book.findByIdAndDelete(req.params.bookId);
  res.status(200).json({ message: "Book is deleted!" });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});
//Update the Book
app.put("/api/v1/book/:bookId", async (req, res) => {
 try {
  const bookUpdated = await Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true});
  res.status(200).json({ message: "Book is updated!" });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});
async function startServer() {
 const mongoUri = process.env.MONGOOSE_URI;
 if (!mongoUri) {
  throw new Error("MONGOOSE_URI is not set. Add it to your .env file.");
 }

 await mongoose.connect(mongoUri);
 console.log("MongoDB connected");
 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 });
}

startServer().catch((error) => {
 console.error("Failed to start server:", error);
 process.exit(1);
});
