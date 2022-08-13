const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "You must provide a title"],
    trim: true,
    maxLength: [100, "Title cannot have more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "You must provide a description"],
    trim: true,
    maxLength: [1000, "Description cannot have more than 1000 characters"],
  },
  completed: {
    type: Boolean,
    required: [true, "You must provide a status for the task"],
  },
  dueDate: {
    type: Date,
    required: [true, "You must provide a due Date"],
  },
  comments: {
    type: String,
    default: "",
    maxLength: [1000, "Comments cannot have more than 1000 characters"],
  },
  responsible: {
    type: String,
    default: "",
    maxLength: [100, "Responsible cannot have more than 100 characters"],
  },
  tags: {
    type: [String],
    default: [],
  },
  ownerID: {
    type: String,
    required: [true, "You must provide the ownerID of the task"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
