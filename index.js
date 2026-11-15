require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/booksRoutes");
//!express instance

const app = express();
const PORT = 5000;
//Middlewares
app.use(express.json());

//Routes

app.use('/api/v1/books', bookRouter);
//Listening server
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
