import  Express  from "express";
import { checkout ,  paymentVerification  } from "../controller/controller.js";

const router = Express.Router()

// router.route("/createStudent").post(createStudent)
// router.route("/createResume").post(createResume)
// router.route("/getAllStudents").get(getAllStudents)
router.route("/checkout").post(checkout)
router.route("/paymentVerification").post(paymentVerification)






export default router