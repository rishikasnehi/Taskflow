const Task = require("../models/Task");

const Project = require("../models/Project");

const asyncHandler = require("../utils/asyncHandler");


// CREATE TASK
exports.createTask = asyncHandler(async (req, res) => {

  const {
    title,
    description,
    status,
    priority,
    dueDate,
    project,
    assignedTo,
  } = req.body;

  // VALIDATION
  if (!title || !project) {

    res.status(400);

    throw new Error("Title and project are required");

  }

  // CHECK PROJECT
  const existingProject = await Project.findById(project);

  if (!existingProject) {

    res.status(404);

    throw new Error("Project not found");

  }

  // CREATE TASK
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    project,
    assignedTo,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });

});




// GET ALL TASKS
exports.getTasks = asyncHandler(async (req, res) => {

  const { project, status, priority } = req.query;

  let query = {};

  // FILTERS
  if (project) {
    query.project = project;
  }

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  const tasks = await Task.find(query)
    .populate("project", "title")
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });

});




// GET SINGLE TASK
exports.getSingleTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id)
    .populate("project", "title")
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  if (!task) {

    res.status(404);

    throw new Error("Task not found");

  }

  res.status(200).json({
    success: true,
    task,
  });

});




// UPDATE TASK
exports.updateTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {

    res.status(404);

    throw new Error("Task not found");

  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    updatedTask,
  });

});




// DELETE TASK
exports.deleteTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {

    res.status(404);

    throw new Error("Task not found");

  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });

});