import express from "express";
import formidable from "express-formidable";
import {
    createItrFiling,
    getAllItrFilings,
    getItrFilingById,
    updateItrFiling,
    deleteItrFiling
} from "../controllers/itrFilingController.js";

const router = express.Router();

router.post('/itr-filing', formidable(), createItrFiling);
router.get('/itr-filings', getAllItrFilings);
router.get('/itr-filing/:id', getItrFilingById);
router.put('/itr-filing/:id', formidable(), updateItrFiling);
router.delete('/itr-filing/:id', deleteItrFiling);

export default router;
