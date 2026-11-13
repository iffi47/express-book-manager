const express = require("express");
//!express instance

const app = express();
const PORT = 5000;

//!Start the server
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
})