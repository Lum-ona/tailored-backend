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
});

module.exports = mongoose.model("Student", studentSchema);
