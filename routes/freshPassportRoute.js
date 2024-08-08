import express from "express";
import formidable from "express-formidable";
import {
    createFreshPassport,
    getAllFreshPassports,
    getFreshPassportById,
    updateFreshPassport,
    deleteFreshPassport
} from "../controllers/freshPassportController.js";

const router = express.Router();

router.post('/fresh-passport', formidable(), createFreshPassport);
router.get('/fresh-passports', getAllFreshPassports);
router.get('/fresh-passport/:id', getFreshPassportById);
router.put('/fresh-passport/:id', formidable(), updateFreshPassport);
router.delete('/fresh-passport/:id', deleteFreshPassport);

export default router;
