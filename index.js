const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

//GET
app.get("/", (req, res) => {
  res.send("server is running");
});

//LISTENING TO PORT
app.listen(port, () => {
  console.log("listening port", port);
});
