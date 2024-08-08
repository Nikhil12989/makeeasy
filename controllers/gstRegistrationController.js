import GstRegistration from "../models/gstRegistration.js";
import fs from "fs";

// Create GST Registration
export const createGstRegistration = async (req, res) => {
    try {
        const {
            businessFullName,
            ownerFullName,
            mobileNumber,
            panNumber,
            email,
            businessStartDate,
            natureOfBusiness
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: fs.readFileSync(req.files.aadharCard.path),
            contentType: req.files.aadharCard.type
        } : undefined;

        const panCard = req.files.panCard ? {
            data: fs.readFileSync(req.files.panCard.path),
            contentType: req.files.panCard.type
        } : undefined;

        const photo = req.files.photo ? {
            data: fs.readFileSync(req.files.photo.path),
            contentType: req.files.photo.type
        } : undefined;

        const signature = req.files.signature ? {
            data: fs.readFileSync(req.files.signature.path),
            contentType: req.files.signature.type
        } : undefined;

        const electricityBill = req.files.electricityBill ? {
            data: fs.readFileSync(req.files.electricityBill.path),
            contentType: req.files.electricityBill.type
        } : undefined;

        const shopActLicense = req.files.shopActLicense ? {
            data: fs.readFileSync(req.files.shopActLicense.path),
            contentType: req.files.shopActLicense.type
        } : undefined;

        const rentAgreement = req.files.rentAgreement ? {
            data: fs.readFileSync(req.files.rentAgreement.path),
            contentType: req.files.rentAgreement.type
        } : undefined;

        const newGstRegistration = new GstRegistration({
            businessFullName,
            ownerFullName,
            mobileNumber,
            panNumber,
            email,
            businessStartDate,
            natureOfBusiness,
            documents: {
                aadharCard,
                panCard,
                photo,
                signature,
                electricityBill,
                shopActLicense,
                rentAgreement
            }
        });

        await newGstRegistration.save();

        res.status(201).json({ message: "GST Registration created successfully", newGstRegistration });
    } catch (error) {
        console.error("Error creating GST Registration:", error);
        res.status(500).json({ message: "Error creating GST Registration", error: error.message });
    }
};

// Get All GST Registrations
export const getAllGstRegistrations = async (req, res) => {
    try {
        const gstRegistrations = await GstRegistration.find();
        res.status(200).json({ gstRegistrations });
    } catch (error) {
        console.error("Error retrieving GST Registrations:", error);
        res.status(500).json({ message: "Error retrieving GST Registrations", error: error.message });
    }
};

// Get GST Registration by ID
export const getGstRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;
        const gstRegistration = await GstRegistration.findById(id);

        if (!gstRegistration) {
            return res.status(404).json({ message: "GST Registration not found" });
        }

        res.status(200).json({ gstRegistration });
    } catch (error) {
        console.error("Error retrieving GST Registration:", error);
        res.status(500).json({ message: "Error retrieving GST Registration", error: error.message });
    }
};

// Update GST Registration
export const updateGstRegistration = async (req, res) => {
    try {
        const {
            businessFullName,
            ownerFullName,
            mobileNumber,
            panNumber,
            email,
            businessStartDate,
            natureOfBusiness
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: fs.readFileSync(req.files.aadharCard.path),
            contentType: req.files.aadharCard.type
        } : undefined;

        const panCard = req.files.panCard ? {
            data: fs.readFileSync(req.files.panCard.path),
            contentType: req.files.panCard.type
        } : undefined;

        const photo = req.files.photo ? {
            data: fs.readFileSync(req.files.photo.path),
            contentType: req.files.photo.type
        } : undefined;

        const signature = req.files.signature ? {
            data: fs.readFileSync(req.files.signature.path),
            contentType: req.files.signature.type
        } : undefined;

        const electricityBill = req.files.electricityBill ? {
            data: fs.readFileSync(req.files.electricityBill.path),
            contentType: req.files.electricityBill.type
        } : undefined;

        const shopActLicense = req.files.shopActLicense ? {
            data: fs.readFileSync(req.files.shopActLicense.path),
            contentType: req.files.shopActLicense.type
        } : undefined;

        const rentAgreement = req.files.rentAgreement ? {
            data: fs.readFileSync(req.files.rentAgreement.path),
            contentType: req.files.rentAgreement.type
        } : undefined;

        const updatedGstRegistration = await GstRegistration.findByIdAndUpdate(
            req.params.id,
            {
                businessFullName,
                ownerFullName,
                mobileNumber,
                panNumber,
                email,
                businessStartDate,
                natureOfBusiness,
                documents: {
                    aadharCard,
                    panCard,
                    photo,
                    signature,
                    electricityBill,
                    shopActLicense,
                    rentAgreement
                }
            },
            { new: true }
        );

        if (!updatedGstRegistration) {
            return res.status(404).json({ message: "GST Registration not found" });
        }

        res.status(200).json({ message: "GST Registration updated successfully", updatedGstRegistration });
    } catch (error) {
        console.error("Error updating GST Registration:", error);
        res.status(500).json({ message: "Error updating GST Registration", error: error.message });
    }
};

// Delete GST Registration
export const deleteGstRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGstRegistration = await GstRegistration.findByIdAndDelete(id);

        if (!deletedGstRegistration) {
            return res.status(404).json({ message: "GST Registration not found" });
        }

        res.status(200).json({ message: "GST Registration deleted successfully" });
    } catch (error) {
        console.error("Error deleting GST Registration:", error);
        res.status(500).json({ message: "Error deleting GST Registration", error: error.message });
    }
};
