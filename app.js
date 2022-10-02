require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");
const AuthN = require("./middleware/auth");

const { init } = require("./config/connection");
const logger = require("./lib/logger");

app.use(morgan("dev"));

app.use(express.json());

app.use("/", authRoutes.router);
app.use("/", AuthN, todoRoutes.router);

app.use((req, res) => {
  const error = new Error("Not found");
  logger.error(error.message, { url: req.originalUrl });
  res.status(404).json({
    message: error.message,
  });
});

init().then(() => {
  app.listen(process.env.PORT || 4000, () => {
    logger.info(`Server Started at http://localhost:${process.env.PORT}/`);
  });
});
