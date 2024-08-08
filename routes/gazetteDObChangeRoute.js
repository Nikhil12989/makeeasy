import express from "express";
import formidable from "express-formidable";
import {
    createGazetteDOBChange,
    getAllGazetteDOBChanges,
    getGazetteDOBChangeById,
    updateGazetteDOBChange,
    deleteGazetteDOBChange
} from "../controllers/gazetteDOBChangeController.js";

const router = express.Router();

router.post('/gazette-dob-change', formidable(), createGazetteDOBChange);
router.get('/gazette-dob-changes', getAllGazetteDOBChanges);
router.get('/gazette-dob-change/:id', getGazetteDOBChangeById);
router.put('/gazette-dob-change/:id', formidable(), updateGazetteDOBChange);
router.delete('/gazette-dob-change/:id', deleteGazetteDOBChange);

export default router;
