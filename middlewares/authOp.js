const Task = require("../models/Task");

async function authOp(req, res, next) {
  // Get taskID
  const { id: taskID } = req.params;
  try {
    // find Task
    let task = await Task.findById(taskID);
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with ID ${taskID} was found.` });
    }
    // Validate task belongs to user
    const userID = req.headers.uid;
    if (task.ownerID !== userID) {
      return res.status(403).json({
        msg: `The task with ID ${taskID} does not belong to the user with ID ${userID}.`,
      });
    }
    // Task belongs to user
    next();
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

module.exports = authOp;
