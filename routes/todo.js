const express = require("express");
const router = express.Router();

const todoContoller = require("../controllers/todo");

router.get("/items", todoContoller.getItems);

router.post("/item", todoContoller.createItem);

router
  .route("/item/:id")
  .get(todoContoller.getItembyID)
  .put(todoContoller.updateItem)
  .delete(todoContoller.deleteItem);

module.exports = {
  router,
};
