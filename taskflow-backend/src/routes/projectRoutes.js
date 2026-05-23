const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");


// ROUTES
router.post("/", protect, createProject);

router.get("/", protect, getProjects);

router.get("/:id", protect, getSingleProject);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);


module.exports = router;