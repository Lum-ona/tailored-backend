const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  level: { type: String, required: true },
  instructorName: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: { type: Date, required: true },
  certificatesOffered: { type: String, required: true },
  noOfLessons: { type: Number, required: true },
  lessons: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema);
