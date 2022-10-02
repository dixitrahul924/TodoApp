require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");

const { init } = require("./config/connection");

app.use(morgan("dev"));

app.use(express.json());

app.use("/", authRoutes.router);
app.use("/", todoRoutes.router);

init().then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server Started at http://localhost:${process.env.PORT}/`);
  });
});
