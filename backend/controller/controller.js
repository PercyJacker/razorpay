import  Express from 'express'
import student from '../model/student.model.js';
import {transaction} from '../model/trans.model.js';
import resume from '../model/resume.model.js';
import multer from "multer";
import Razorpay from "razorpay";
import crypto from 'crypto'
import  {instance}  from '../index.js';


const app =Express();

// Create a student profile

// Create Student Controller
// export const createStudent = async (req, res) => {
//   try {
//     // Extract student data from the request body
//     const { name, email, qualification, experience } = req.body;

//     // Create a new student document using the Student model
//     const students = await student.create({
//       name,
//       email,
//       qualification,
//       experience,
//     });

//     // Respond with success
//     res.status(201).json({
//       success: true,
//       students,
//     });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({
//       success: false,
//       message: 'Error creating student profile',
//       error: error.message,
//     });
//   }
// };


// export const createResume = async (studentId) => {
//   try {
//     // Extract student data from the request body
//     const { student, name, qualification, experience ,personalDetails ,resumeUrl ,createdAt  } = req.body;

//     // Create a new student document using the Student model
//     const resumes = await resume.create({
//       student,
//       name,
//       email,
//       qualification,
//       experience,
//       personalDetails,
//       resumeUrl,
//       createdAt
//     });

//     // Respond with success
//     res.status(201).json({
//       success: true,
//       resumes,
//     });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({
//       success: false,
//       message: 'Error creating student profile',
//       error: error.message,
//     });
//   }
// };


// export const getAllStudents = async (req, res) => {
//   try {
//     // Fetch all student records from the database
//     const students = await student.find();

//     // Respond with the list of students
//     res.status(200).json({
//       success: true,
//       count: students.length,
//       students,
//     });
//   } catch (error) {
//     // Handle any errors that occur
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching students',
//       error: error.message,
//     });
//   }
// };


  
//   // Example Usage: Create a Transaction
//   async function createTransaction(studentId, paymentId) {
//     const transaction = new trans({
//       student: studentId,
//       amount: 50,
//       paymentId: paymentId,
//       status: 'success', // Simulated success status
//     });
//     await transaction.save();
//     console.log('Transaction recorded:', transaction);
//   }

//   // Multer configuration for photo upload
// const upload = multer({ dest: 'uploads/' });

// // API to create a new student
// app.post('/students', upload.single('photo'), async (req, res) => {
//   try {
//     const { name, qualification, experience, personalDetails } = req.body;

//     const students = new student({
//       name,
//       qualification,
//       experience,
//       personalDetails,
//       photo: req.file.path,
//     });

//     await student.save();
//     res.status(201).json({ message: 'Student profile created', students });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating student profile', error });
//   }
// });


  // app.post('/resume', async (req, res) => {
  //   try {
  //     const { studentId, paymentId } = req.body;
  
  //     // Validate payment (Optional: Add Razorpay payment verification logic here)
  
  //     const student = await Student.findById(studentId);
  //     if (!student) {
  //       return res.status(404).json({ message: 'Student not found' });
  //     }
  
  //     // Mock generating a resume (In a real application, use Puppeteer or jsPDF)
  //     const resumeUrl = `http://example.com/resumes/${studentId}.pdf`;
  
  //     // Create a resume entry
  //     const resume = new Resume({
  //       student: studentId,
  //       resumeUrl,
  //     });
  //     await resume.save();
  
  //     // Associate resume with the student profile
  //     student.resumes.push(resume._id);
  //     await student.save();
  
  //     res.status(201).json({ message: 'Resume generated', resume });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error generating resume', error });
  //   }
  // });

export const paymentVerification=async(req,res)=>{
    //req id , signature from body
    //make body
    //make expectedSignature
    //compare expectedSignature and signature and if they are equal or not
    

    console.log(req.body);

    const {razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const body  = razorpay_order_id + "|" + razorpay_payment_id;


    const expectedSignature = crypto 
        .createHmac("sha256",process.env.KEY_SECRET )
        .update(body.toString())
        .digest("hex")

    if (expectedSignature == razorpay_signature) {
    "payment is successful"
     }


// var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
// validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, razorpay_signature, secret);
    // paymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
    // var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
   console.log("sign recieved :",razorpay_signature);
   console.log("sign  generated :",expectedSignature);

   const authenticated = expectedSignature === razorpay_signature

   if(authenticated){

  //   //?database will come here
  return res.redirect(`https://peesa-yn31.vercel.app/aboutus`)

}
   else{
    res.status(400).json({
        success:false,
    })
   }
    console.log({order});
    res.status(200).json({
        success:true,
    })

  }



export const checkout = async (req, res) => {
  try {
    // Initialize Razorpay instance
    const instance = new Razorpay({
      key_id: process.env.API_KEY,
      key_secret: process.env.KEY_SECRET,
    });

    // Create a new order with Razorpay
    const order = await instance.orders.create({
      amount: 5000, // Convert amount to smallest currency unit (paise)
      currency: "INR",
    });

    // Respond with success and order details
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in Razorpay order creation:", error);

    // Send error response
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};








  

