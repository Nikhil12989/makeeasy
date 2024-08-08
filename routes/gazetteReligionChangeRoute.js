import express from "express";
import formidable from "express-formidable";
import {
    createGazetteReligionChange,
    getAllGazetteReligionChanges,
    getGazetteReligionChangeById,
    updateGazetteReligionChange,
    deleteGazetteReligionChange
} from "../controllers/gazetteReligionChangeController.js";

const router = express.Router();

router.post('/gazette-religion-change', formidable(), createGazetteReligionChange);
router.get('/gazette-religion-changes', getAllGazetteReligionChanges);
router.get('/gazette-religion-change/:id', getGazetteReligionChangeById);
router.put('/gazette-religion-change/:id', formidable(), updateGazetteReligionChange);
router.delete('/gazette-religion-change/:id', deleteGazetteReligionChange);

export default router;
