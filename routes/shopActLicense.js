import express from "express";
import formidable from "express-formidable";
import {
    createShopActLicense,
    getAllShopActLicenses,
    getShopActLicenseById,
    updateShopActLicense,
    deleteShopActLicense,
} from "../controllers/shopActController.js";

const router = express.Router();

// Create Shop Act License
router.post("/createShopActLicense", formidable(), createShopActLicense);

// Get All Shop Act Licenses
router.get("/getAllShopActLicenses", getAllShopActLicenses);

// Get Shop Act License by ID
router.get("/getShopActLicense/:id", getShopActLicenseById);

// Update Shop Act License
router.put("/updateShopActLicense/:id", formidable(), updateShopActLicense);

// Delete Shop Act License
router.delete("/deleteShopActLicense/:id", deleteShopActLicense);

export default router;
