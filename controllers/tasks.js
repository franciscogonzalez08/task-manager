const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    // Find tasks for that user ID
    const tasks = await Task.find({ ownerID: req.headers.uid }); // We do not need to validate the header, that is done in the previous middleware called authenticateUser

    // tasks could be an empty array if the user with that ID has not any saved task
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);

    // dueDate of task is UTC() format. It needs an adjustment to match current timezone.
    // TODO: Work on fixing timezone or delete this section
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
    const userID = req.headers.uid;

    // Create task for that user
    req.body["ownerID"] = userID;
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    // Update task
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
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
    const { id: taskID } = req.params;

    // Delete task for that user
    task = await Task.findByIdAndDelete(taskID);
    res.status(200).json({ task });
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
