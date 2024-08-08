import express from "express";
import formidable from "express-formidable";
import {
    createIncomeCertificate,
    getAllIncomeCertificates,
    getIncomeCertificateById,
    updateIncomeCertificate,
    deleteIncomeCertificate
} from "../controllers/incomeCertificateController.js";

const router = express.Router();

router.post('/income-certificate', formidable(), createIncomeCertificate);
router.get('/income-certificates', getAllIncomeCertificates);
router.get('/income-certificate/:id', getIncomeCertificateById);
router.put('/income-certificate/:id', formidable(), updateIncomeCertificate);
router.delete('/income-certificate/:id', deleteIncomeCertificate);

export default router;
