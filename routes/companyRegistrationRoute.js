import express from "express";
import formidable from "express-formidable";
import {
    createCompanyRegistration,
    getAllCompanyRegistrations,
    getCompanyRegistrationById,
    updateCompanyRegistration,
    deleteCompanyRegistration,
} from "../controllers/companyRegistrationController.js";

const router = express.Router();

// Create Company Registration
router.post("/createCompanyRegistration", formidable(), createCompanyRegistration);

// Get All Company Registrations
router.get("/getAllCompanyRegistrations", getAllCompanyRegistrations);

// Get Company Registration by ID
router.get("/getCompanyRegistration/:id", getCompanyRegistrationById);

// Update Company Registration
router.put("/updateCompanyRegistration/:id", formidable(), updateCompanyRegistration);

// Delete Company Registration
router.delete("/deleteCompanyRegistration/:id", deleteCompanyRegistration);

export default router;
