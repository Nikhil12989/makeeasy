import express from "express";
import { createRenewalLicense, getRenewalLicense, getAllRenewalLicenses } from "../controllers/renewalLicenseController.js";
import formidable from "express-formidable";

const router = express.Router();

// Create a renewal license
router.post("/createRenewalDL", formidable(), createRenewalLicense);

// Get a renewal license by ID
router.get("/getRenewalDL/:id", getRenewalLicense);

// Get all renewal licenses
router.get("/getAllRenewalDL", getAllRenewalLicenses);

export default router;
