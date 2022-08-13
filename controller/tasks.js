const Task = require("../models/Task");
const User = require("../models/User");

const getAllTasks = async (req, res) => {
  try {
    // Get user ID
    const userID = req.headers.uid;
    if (!userID) {
      return res.status(400).json({
        msg: "The request has no user ID header, please provide a value for the 'uid' header.",
      });
    }

    // Find tasks for that user ID
    const tasks = await Task.find({ ownerID: userID });

    // tasks could be an empty array if the user with that ID has not any saved task
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    // Check that user exists
    // TODO: Refactor so it is a function for userAuth
    const userID = req.headers.uid;
    if (!userID) {
      return res.status(400).json({
        msg: "The request has no user ID header, please provide a value for the 'uid' header.",
      });
    }

    const user = await User.findById(userID);
    console.log(user); // DBUG

    if (!user) {
      return res.status(401).json({
        msg: `No user with ID ${userID} was found. You cannot get tasks for nonexisting users.`,
      });
    }

    // Find Task
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with ID ${taskID} was found.` });
    }

    // Validate task belongs to that user
    const ownerID = task.ownerID;

    if (ownerID !== userID) {
      return res.status(403).json({
        msg: `The task with ID ${taskID} does not belong to the user with ID ${userID}.`,
      });
    }

    // dueDate of task is UTC() format. It needs an adjustment to match current timezone.
    // TODO: Work on fixing timezone
    // const date = task.at(0).dueDate;
    // const timezoneOffset = date.getTimezoneOffset();
    // const localDate = date.getTime() - timezoneOffset * 60_000;
    // const newDate = new Date(localDate);

    // Send task
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    // Check that user exists
    const ownerID = req.body.ownerID;
    const user = await User.findById(ownerID);

    if (!user) {
      return res.status(401).json({
        msg: `No user with ID ${ownerID} was found. You cannot create tasks for nonexisting users.`,
      });
    }

    // Create task for that user
    const task = await Task.create(req.body);
    res.status(201).json({
      msg: `Task for user with ID ${ownerID} was successfully created.`,
      task,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    // TODO: Refactor using findOneAndUpdate({_id: taskID, ownerID:})
    // Get user ID
    const userID = req.headers.uid;
    if (!userID) {
      return res.status(400).json({
        msg: "The request has no user ID header, please provide a value for the 'uid' header.",
      });
    }

    // Find task
    const { id: taskID } = req.params;
    let task = await Task.findById(taskID);

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with ID ${taskID} was found.` });
    }

    // Validate task belongs to user
    const ownerID = task.ownerID;

    if (ownerID !== userID) {
      return res.status(403).json({
        msg: `The task with ID ${taskID} does not belong to the user with ID ${userID}.`,
      });
    }

    // Update task
    task = await Task.findByIdAndUpdate(taskID, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    // We do not need to check if user exists. We will delete the task only if the ownerID matches the userID that is making the request..
    const userID = req.headers.uid;
    if (!userID) {
      return res.status(400).json({
        msg: "The request has no user ID header, please provide a value for the 'uid' header.",
      });
    }

    // find task
    const { id: taskID } = req.params;
    let task = await Task.findById(taskID);

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with ID ${taskID} was found.` });
    }

    // Validate task belongs to that user
    const ownerID = task.ownerID;

    if (ownerID !== userID) {
      return res.status(403).json({
        msg: `The task with ID ${taskID} cannot be deleted because it does not belong to the user with ID ${userID}.`,
      });
    }

    // TODO: Check if performance can be enhanced by not queries twice TIP: Use findOnAndDelete({_id: taskID, ownerID: userID})
    // Delete task for that user
    task = await Task.findByIdAndDelete(taskID);
    res.status(200).json({
      msg: `Task with ID ${task._id} was successfully deleted`,
      task,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
