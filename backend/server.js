const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// ===============================
// MongoDB Connection
// ===============================
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// ===============================
// Schema & Model
// ===============================
const studentSchema = new mongoose.Schema({
    name: String,
    course: String
});

const Student = mongoose.model("Student", studentSchema);


// ===============================
// POST API (Create Student)
// ===============================
app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json({ message: "Student added successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});


// ===============================
// GET API (Fetch Students)
// ===============================
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json(err);
    }
});


// ===============================
// Start Server
// ===============================
app.listen(5000, () => {
    console.log("Server running on port 5000");
});