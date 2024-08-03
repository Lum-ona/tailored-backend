const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  school: { type: String, required: true },
  grade: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  parentName: { type: String, required: true },
  parentContactNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Active" },
  lastLogin: { type: Date }, // Last login date
  totalLoginTime: { type: Number, default: 0 }, // Total time spent on the platform in minutes
  completedAssignments: { type: Number, default: 0 }, // Number of completed assignments
  coursesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // List of taken courses
});

module.exports = mongoose.model("Student", studentSchema);
