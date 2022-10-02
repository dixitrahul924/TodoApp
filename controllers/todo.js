const Items = require("../Model/Item");

const getItems = async (req, res) => {
  await Items.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.error(err.message);
      res.send(err.message);
    });
};

const getItembyID = async (req, res) => {
  await Items.findById(req.params.id)
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.error(err.message);
      res.send(err.message);
    });
};

const createItem = async (req, res) => {
  const item = new Items({
    title: req.body.title,
    description: req.body.description,
  });

  await item
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Error Occured", err.message);
      res.send(err.message);
    });
};

const updateItem = async (req, res) => {
  await Items.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Error Occured", err.message);
      res.send(err.message);
    });
};

const deleteItem = async (req, res) => {
  await Items.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Error Occured", err.message);
      res.send(err.message);
    });
};

module.exports = {
  getItems,
  createItem,
  getItembyID,
  updateItem,
  deleteItem,
};
