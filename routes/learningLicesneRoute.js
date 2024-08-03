import express from "express"
import { createLearningLicense, getAllLearningLicenses, getLearningLicense } from "../controllers/learningLicenseController.js"
import formidable from "express-formidable"


const router = express.Router()

//learning license form creation 

router.post("/createLearningDL", formidable(), createLearningLicense)

// get learning license form 

router.get("/getAllLearningDL", getAllLearningLicenses)

// Get learning license data by ID
router.get("/getLearningDL/:id", getLearningLicense);

export default router