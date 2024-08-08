import express from "express";
import formidable from "express-formidable";
import {
    createGstRegistration,
    getAllGstRegistrations,
    getGstRegistrationById,
    updateGstRegistration,
    deleteGstRegistration
} from "../controllers/gstRegistrationController.js";

const router = express.Router();

router.post('/gst-registration', formidable(), createGstRegistration);
router.get('/gst-registrations', getAllGstRegistrations);
router.get('/gst-registration/:id', getGstRegistrationById);
router.put('/gst-registration/:id', formidable(), updateGstRegistration);
router.delete('/gst-registration/:id', deleteGstRegistration);

export default router;
