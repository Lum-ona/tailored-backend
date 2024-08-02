const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseCode: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, required: true },
  instructorName: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: { type: Date, required: true },
  certificatesOffered: { type: String, required: true },
  noOfLessons: { type: Number, required: true },
  lessons: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
