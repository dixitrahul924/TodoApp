require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
