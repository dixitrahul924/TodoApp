const express = require("express");
const { get } = require("mongoose");
const router = express.Router();

const todoContoller = require("../controllers/todo");

router.get("/items", todoContoller.getItems);

router
  .route("/item/:id")
  .get(todoContoller.getItembyID)
  .put(todoContoller.updateItem)
  .delete(todoContoller.deleteItem);

router.post("/item", todoContoller.createItem);

module.exports = {
  router,
};
