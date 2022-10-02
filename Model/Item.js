const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("Items", itemsSchema);
