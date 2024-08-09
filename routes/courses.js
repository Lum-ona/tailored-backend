const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Helper function to generate the next course code
const generateCourseCode = async () => {
  const lastCourse = await Course.findOne().sort({ courseCode: -1 });
  let lastCode = lastCourse ? lastCourse.courseCode : "A00000";

  let nextCode = (parseInt(lastCode.slice(1), 36) + 1)
    .toString(36)
    .toUpperCase()
    .padStart(5, "0");
  return `A${nextCode}`;
};

// Endpoint to generate the next course code
router.get("/generateCode", async (req, res) => {
  try {
    let courseCode;
    let isUnique = false;

    while (!isUnique) {
      courseCode = await generateCourseCode();
      const existingCourse = await Course.findOne({ courseCode });
      isUnique = !existingCourse;
    }

    res.status(200).json({ courseCode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new course
router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
