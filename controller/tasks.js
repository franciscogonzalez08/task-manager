const getAllTasks = (req, res) => {
  res.json("Get all Tasks");
};

const getTask = (req, res) => {
  res.json("Get Task");
};

const createTask = (req, res) => {
  res.json("Create Task");
};

const updateTask = (req, res) => {
  res.json("Update Task");
};

const deleteTask = (req, res) => {
  res.json("Delete Task");
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
