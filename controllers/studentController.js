import Student from "../models/student.js";

export function getStudents(req, res) {

    Student.find().then(
    
            (students) => {
    
                res.json(students);
    
            }
        )
    }

export async function createStudents(req, res) {

    if(req.user == null) {
        res.json({message: "Unauthorized"});
        return;
    }

    try {
        const newStudent = new Student({
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
        })  
        
        await newStudent.save()
        res.json({message: "Student created successfully"});
    
    } catch (error) {
        res.status(500).json({ message: "Error creating student", error: error.message });
    }}