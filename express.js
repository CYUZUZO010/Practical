const express = require("express");
const app = express();
const students = [];

// Middleware
app.use(express.json());

// Student class
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  getDetails() {
    return `Name: ${this.name}, Grade: ${this.grade}`;
  }
}

app.post("/student", (req, res) => {
  const { name, grade } = req.body;

  if (!name || !grade) {
    return res.status(400).json({ message: "Name and grade are required." });
  }

  const newStudent = new Student(name, grade);
  students.push(newStudent);
  res.status(201).json({ message: "Student added successfully." });
});


app.get("/students", (req, res) => {
  const studentDetails = students.map((student) => student.getDetails());
  res.json(studentDetails);
});

// Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
