const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// quick test route (optional, just for checking)
router.get("/test", (req, res) => {
  res.send("projects router is working");
});

// GET /api/projects  → retrieves all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/projects > creates a new project in the database
router.post("/", async (req, res, next) => {
  // expected {name: 'LAB04', dueDate: '2024-11-27', course: 'ASP.NET'}
  let project = new Project(req.body);
  await project.save();
  res.status(201).json(project); // 201 means 'created' as per https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
});

router.delete('/:_id', (req, res, next) => {
  Project.remove({ _id: req.params._id }, (err, project) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(204).json(project); // 204 Deleted Successfully
    }
  });
});

// PUT /api/projects > updates a project in the database
router.put("/", async (req, res, next) => {
  let project = await Project.findByIdAndUpdate(
    { _id: req.body._id },
    req.body
  );
  res.status(202).json(project);
});


module.exports = router;
