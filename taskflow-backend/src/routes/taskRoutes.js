const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");


// ROUTES
router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.get("/:id", protect, getSingleTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);


module.exports = router;