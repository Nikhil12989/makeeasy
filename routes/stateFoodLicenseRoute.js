import express from "express";
import formidable from "express-formidable";
import { createStateFoodLicense, getAllStateFoodLicenses, getStateFoodLicenseById } from "../controllers/stateFoodLicenseController.js";

const router = express.Router();

// Create State Food License
router.post("/createStateFoodLicense", formidable(), createStateFoodLicense);

// Get All State Food Licenses
router.get("/getAllStateFoodLicenses", getAllStateFoodLicenses);

// Get State Food License by ID
router.get("/getStateFoodLicense/:id", getStateFoodLicenseById);

export default router;
