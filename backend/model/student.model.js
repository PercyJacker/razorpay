import mongoose from "mongoose";

//mongoose.scehma is a function
// Schema for Student Profiles
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Student's name
    email: { type: String, required: true, unique: true }, // Student's email
    qualification: { type: String, required: true }, // Student's qualification
    experience: { type: String, required: false }, // Optional experience field
    // profilePhoto: { type: String, required: false }, // URL of the profile photo
    // isPremium: { type: Boolean, default: false }, // Indicates if the student has a premium plan
    // resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }], // References to associated resumes
  });
  

export default mongoose.model('student',studentSchema);

