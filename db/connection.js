const mongoose = require("mongoose");

const init = () =>
  mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(" DB Connection successful");
    })
    .catch((err) => console.log(err));

module.exports = { init };
