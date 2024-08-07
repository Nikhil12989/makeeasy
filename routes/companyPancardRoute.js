import express from "express";
import formidable from "express-formidable";
import {
    createCompanyPancard,
    getAllCompanyPancards,
    getCompanyPancardById,
    updateCompanyPancard,
    deleteCompanyPancard,
} from "../controllers/companyPancardController.js";

const router = express.Router();

// Create Company Pancard
router.post("/createCompanyPancard", formidable(), createCompanyPancard);

// Get All Company Pancards
router.get("/getAllCompanyPancards", getAllCompanyPancards);

// Get Company Pancard by ID
router.get("/getCompanyPancard/:id", getCompanyPancardById);

// Update Company Pancard
router.put("/updateCompanyPancard/:id", formidable(), updateCompanyPancard);

// Delete Company Pancard
router.delete("/deleteCompanyPancard/:id", deleteCompanyPancard);

export default router;
