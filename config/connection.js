const mongoose = require("mongoose");
const logger = require("../lib/logger");

const init = () =>
  mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info(" DB Connection successful");
    })
    .catch((err) => logger.error(err));

module.exports = { init };
