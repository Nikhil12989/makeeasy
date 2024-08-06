import express from "express";
import formidable from "express-formidable";
import { createLocalFoodLicense, getAllLocalFoodLicenses, getLocalFoodLicenseById } from "../controllers/localFoodLicenseController.js";

const router = express.Router();

// Create Local Food License
router.post("/createLocalFoodLicense", formidable(), createLocalFoodLicense);

// Get All Local Food Licenses
router.get("/getAllLocalFoodLicenses", getAllLocalFoodLicenses);

// Get Local Food License by ID
router.get("/getLocalFoodLicense/:id", getLocalFoodLicenseById);

export default router;
