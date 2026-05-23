const Project = require("../models/Project");


// CREATE PROJECT
exports.createProject = async (req, res) => {

  try {

    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    const project = await Project.create({
      title,
      description,
      status,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};




// GET ALL PROJECTS
exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find({
      members: req.user._id,
    })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};




// GET SINGLE PROJECT
exports.getSingleProject = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id)
    .populate("createdBy", "name email")
    .populate("members", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};




// UPDATE PROJECT
exports.updateProject = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      updatedProject,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};




// DELETE PROJECT
exports.deleteProject = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};