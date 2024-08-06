import express from "express";
import formidable from "express-formidable";
import { createFoodManufacturingLicense, getAllFoodManufacturingLicenses, getFoodManufacturingLicenseById } from "../controllers/foodManufacturinglicenseController.js";

const router = express.Router();

// Create Food Manufacturing License
router.post("/createFoodManufacturingLicense", formidable(), createFoodManufacturingLicense);

// Get All Food Manufacturing Licenses
router.get("/getAllFoodManufacturingLicenses", getAllFoodManufacturingLicenses);

// Get Food Manufacturing License by ID
router.get("/getFoodManufacturingLicense/:id", getFoodManufacturingLicenseById);

export default router;
