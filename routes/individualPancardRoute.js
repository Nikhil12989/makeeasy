import express from "express";
import formidable from "express-formidable";
import {
    createIndividualPanCard,
    getAllIndividualPanCards,
    getIndividualPanCardById,
    updateIndividualPanCard,
    deleteIndividualPanCard,
} from "../controllers/individualPancardController.js";

const router = express.Router();

// Create Individual PAN Card
router.post("/createIndividualPanCard", formidable(), createIndividualPanCard);

// Get All Individual PAN Cards
router.get("/getAllIndividualPanCards", getAllIndividualPanCards);

// Get Individual PAN Card by ID
router.get("/getIndividualPanCard/:id", getIndividualPanCardById);

// Update Individual PAN Card
router.put("/updateIndividualPanCard/:id", formidable(), updateIndividualPanCard);

// Delete Individual PAN Card
router.delete("/deleteIndividualPanCard/:id", deleteIndividualPanCard);

export default router;
