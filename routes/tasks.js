const express = require("express");
const authUser = require("../middlewares/authUser");
const authOp = require("../middlewares/authOp");
const router = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.use(authUser);

router.route("/").get(getAllTasks).post(createTask);
// PATCH method is used instead of PUT method to update only the fields that changed
router
  .route("/:id")
  .get(authOp, getTask)
  .patch(authOp, updateTask)
  .delete(authOp, deleteTask);
module.exports = router;
