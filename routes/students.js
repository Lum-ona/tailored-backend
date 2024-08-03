const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Assignment = require("../models/Assignment");

// Fetch All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add Student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit Student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// active counts
router.get("/active-count", async (req, res) => {
  try {
    const activeStudentCount = await Student.countDocuments({
      status: "Active",
    });
    res.status(200).json({ count: activeStudentCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/overview", async (req, res) => {
  try {
    const totalPupils = await Student.countDocuments({});
    const newPupils = await Student.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }); // Example for new pupils in the last 30 days

    res.status(200).json({ totalPupils, newPupils });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/activity", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("coursesTaken")
      .exec();

    if (!student) return res.status(404).json({ message: "Student not found" });

    const assignments = await Assignment.countDocuments({
      student: student._id,
      completed: true,
    });

    res.status(200).json({
      totalLoginTime: student.totalLoginTime,
      completedAssignments: assignments,
      coursesTaken: student.coursesTaken.length,
      lastLogin: student.lastLogin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
