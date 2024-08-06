import express from "express"
import { signInController, signUpController, google } from "../controllers/authController.js"

const router = express.Router()

//Signup routes 

router.post("/signup", signUpController)

router.post("/signin", signInController)

router.post("/google", google)

export default router