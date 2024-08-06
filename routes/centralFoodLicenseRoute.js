import express from "express";
import formidable from "express-formidable";
import { createCentralFoodLicense, getAllCentralFoodLicenses, getCentralFoodLicenseById } from "../controllers/centralFoodLicenseController.js";

const router = express.Router();

// Create Central Food License
router.post("/createCentralFoodLicense", formidable(), createCentralFoodLicense);

// Get All Central Food Licenses
router.get("/getAllCentralFoodLicenses", getAllCentralFoodLicenses);

// Get Central Food License by ID
router.get("/getCentralFoodLicense/:id", getCentralFoodLicenseById);

export default router;
