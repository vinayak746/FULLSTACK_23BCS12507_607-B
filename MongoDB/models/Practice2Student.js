const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Student age is required"],
      min: [17, "Student must be at least 17 years old"],
    },
    course: {
      type: String, // In a more advanced app, this would be a reference: mongoose.Schema.Types.ObjectId
      required: [true, "Student course is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
