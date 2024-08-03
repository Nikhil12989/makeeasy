import express from "express"
import { forgotPasswordController, google, resetPasswordController, signInController, signUpController, verifyOTPController } from "../controllers/authController.js"

const router = express.Router()

//Signup routes 

router.post("/signup", signUpController)

router.post("/signin", signInController)

router.post("/forgot-password", forgotPasswordController)

router.post("/verify-otp", verifyOTPController)

router.post("/reset-password", resetPasswordController)

router.post("/google", google)

export default router