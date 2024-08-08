const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// Create a new assignment
router.post("/", async (req, res) => {
  const { title, description, dueDate, student, multimediaLinks } = req.body;
  try {
    const assignment = new Assignment({
      title,
      description,
      dueDate,
      student,
      multimediaLinks, // Array of multimedia links
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    console.error("Error creating assignment:", error.message);
    res.status(500).send("Server Error");
  }
});

// Get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("student");
    res.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error.message);
    res.status(500).send("Server Error");
  }
});

// Get a specific assignment by ID
router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "student"
    );
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }
    res.json(assignment);
  } catch (error) {
    console.error("Error fetching assignment:", error.message);
    res.status(500).send("Server Error");
  }
});

// Update an assignment by ID
router.put("/:id", async (req, res) => {
  const { title, description, dueDate, multimediaLinks, completed } = req.body;
  try {
    let assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }

    assignment.title = title;
    assignment.description = description;
    assignment.dueDate = dueDate;
    assignment.multimediaLinks = multimediaLinks;
    assignment.completed = completed;

    await assignment.save();
    res.json(assignment);
  } catch (error) {
    console.error("Error updating assignment:", error.message);
    res.status(500).send("Server Error");
  }
});

// Delete an assignment by ID
router.delete("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }

    await assignment.remove();
    res.json({ message: "Assignment deleted" });
  } catch (error) {
    console.error("Error deleting assignment:", error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
