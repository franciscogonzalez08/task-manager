const { application } = require("express");
const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");

router.route("/").get(getAllTasks).post(createTask);
// PATCH method is used instead of PUT method to update only the fields that changed
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
