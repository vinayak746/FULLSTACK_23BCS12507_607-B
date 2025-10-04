const Course = require("../models/courseModel");

// @desc    Create a new course
// @route   POST /api/courses
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating course", error: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
};
