import express from "express";
import formidable from "express-formidable";
import {
    createReIssuePassport,
    getAllReIssuePassports,
    getReIssuePassportById,
    updateReIssuePassport,
    deleteReIssuePassport
} from "../controllers/reIssuePassportController.js";

const router = express.Router();

router.post('/re-issue-passport', formidable(), createReIssuePassport);
router.get('/re-issue-passports', getAllReIssuePassports);
router.get('/re-issue-passport/:id', getReIssuePassportById);
router.put('/re-issue-passport/:id', formidable(), updateReIssuePassport);
router.delete('/re-issue-passport/:id', deleteReIssuePassport);

export default router;
