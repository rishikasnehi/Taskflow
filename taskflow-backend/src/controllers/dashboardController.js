const Project = require("../models/Project");

const Task = require("../models/Task");


// GET DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {

  try {

    // TOTAL PROJECTS
    const totalProjects = await Project.countDocuments({
      members: req.user._id,
    });

    // TOTAL TASKS
    const totalTasks = await Task.countDocuments({
      createdBy: req.user._id,
    });

    // COMPLETED TASKS
    const completedTasks = await Task.countDocuments({
      createdBy: req.user._id,
      status: "done",
    });

    // PENDING TASKS
    const pendingTasks = await Task.countDocuments({
      createdBy: req.user._id,
      status: {
        $ne: "done",
      },
    });

    // HIGH PRIORITY TASKS
    const highPriorityTasks = await Task.countDocuments({
      createdBy: req.user._id,
      priority: "high",
    });

    // RECENT TASKS
    const recentTasks = await Task.find({
      createdBy: req.user._id,
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("project", "title");

    res.status(200).json({
      success: true,

      stats: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        highPriorityTasks,
      },

      recentTasks,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};