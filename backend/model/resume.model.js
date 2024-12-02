import mongoose from "mongoose";

//mongoose.scehma is a function
// Schema for Student Profiles
const resumeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true }, // Reference to the student
    name: { type: String, required: true }, // Name on the resume
    qualification: { type: String, required: true }, // Qualification on the resume
    experience: { type: String, required: false }, // Experience details
    personalDetails: { type: String, required: true }, // Additional personal details
    resumeUrl: { type: String, required: true }, // URL where the generated resume is stored
    createdAt: { type: Date, default: Date.now }, // Timestamp of resume creation
  });
  

export default mongoose.model('resume',resumeSchema);

