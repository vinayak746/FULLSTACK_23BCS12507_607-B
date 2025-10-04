const Student = require("../models/studentModel");

// @desc    Create a new student
// @route   POST /api/students
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating student", error: error.message });
  }
};

// @desc    Get all students
// @route   GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
};
