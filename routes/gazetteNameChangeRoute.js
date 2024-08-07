import express from "express";
import formidable from "express-formidable";
import {
    createGazetteNameChange,
    getAllGazetteNameChanges,
    getGazetteNameChangeById,
    updateGazetteNameChange,
    deleteGazetteNameChange,
} from "../controllers/gazetteNameChangeController.js";

const router = express.Router();

// Create Gazette Name Change
router.post("/createGazetteNameChange", formidable(), createGazetteNameChange);

// Get All Gazette Name Changes
router.get("/getAllGazetteNameChanges", getAllGazetteNameChanges);

// Get Gazette Name Change by ID
router.get("/getGazetteNameChange/:id", getGazetteNameChangeById);

// Update Gazette Name Change
router.put("/updateGazetteNameChange/:id", formidable(), updateGazetteNameChange);

// Delete Gazette Name Change
router.delete("/deleteGazetteNameChange/:id", deleteGazetteNameChange);

export default router;
