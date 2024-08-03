import express from "express"
import formidable from "express-formidable";
import { createPermanentLicense, getAllPermanentLicenses, getPermanentLicense } from "../controllers/permanentLicenseController.js";


const router = express.Router()

// Create a permanent license
router.post("/createPermanentDL", formidable(), createPermanentLicense)

//get a permanent license by id 

router.get("/getPermanentDL/:id", getPermanentLicense)

// Get all permanent licenses

router.get("/getAllPermanentDL", getAllPermanentLicenses)

export default router