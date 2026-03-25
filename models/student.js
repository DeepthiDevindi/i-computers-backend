import mongoose from "mongoose";

const studentshema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        city: String,
    }
)

const Student = mongoose.model("Student", studentshema);

export default Student;