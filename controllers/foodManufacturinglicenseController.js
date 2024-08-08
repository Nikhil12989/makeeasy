import FoodManufacturingLicense from "../models/foodManufacturingLicense.js";
import fs from "fs";

// Create Food Manufacturing License
export const createFoodManufacturingLicense = async (req, res) => {
    try {
        // Trim spaces from keys
        const trimmedFields = {};
        for (const key in req.fields) {
            if (req.fields.hasOwnProperty(key)) {
                trimmedFields[key.trim()] = req.fields[key];
            }
        }

        const {
            licenseRequireYears,
            fullName,
            businessName,
            natureOfBusiness,
            ownerQualification,
            email,
            mobileNumber,
            businessAddress
        } = trimmedFields;

        // Convert files to buffers if they exist
        const aadharCard = req.files['documents.aadharCard'] ? {
            data: fs.readFileSync(req.files['documents.aadharCard'].path),
            contentType: req.files['documents.aadharCard'].type
        } : undefined;

        const panCard = req.files['documents.panCard'] ? {
            data: fs.readFileSync(req.files['documents.panCard'].path),
            contentType: req.files['documents.panCard'].type
        } : undefined;

        const photo = req.files['documents.photo'] ? {
            data: fs.readFileSync(req.files['documents.photo'].path),
            contentType: req.files['documents.photo'].type
        } : undefined;

        const electricBill = req.files['documents.electricBill'] ? {
            data: fs.readFileSync(req.files['documents.electricBill'].path),
            contentType: req.files['documents.electricBill'].type
        } : undefined;

        const rentAgreement = req.files['documents.rentAgreement'] ? {
            data: fs.readFileSync(req.files['documents.rentAgreement'].path),
            contentType: req.files['documents.rentAgreement'].type
        } : undefined;

        const newLicense = new FoodManufacturingLicense({
            licenseRequireYears,
            fullName,
            businessName,
            natureOfBusiness,
            ownerQualification,
            email,
            mobileNumber,
            businessAddress,
            documents: {
                aadharCard,
                panCard,
                photo,
                electricBill,
                rentAgreement
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "Food Manufacturing License created successfully", newLicense });
    } catch (error) {
        console.error("Error creating Food Manufacturing License:", error);
        res.status(500).json({ message: "Error creating Food Manufacturing License", error: error.message });
    }
};

// Get All Food Manufacturing Licenses
export const getAllFoodManufacturingLicenses = async (req, res) => {
    try {
        const licenses = await FoodManufacturingLicense.find();
        res.status(200).json({ licenses });
    } catch (error) {
        console.error("Error retrieving Food Manufacturing Licenses:", error);
        res.status(500).json({ message: "Error retrieving Food Manufacturing Licenses", error: error.message });
    }
};

// Get Food Manufacturing License by ID
export const getFoodManufacturingLicenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const license = await FoodManufacturingLicense.findById(id);

        if (!license) {
            return res.status(404).json({ message: "Food Manufacturing License not found" });
        }

        res.status(200).json({ license });
    } catch (error) {
        console.error("Error retrieving Food Manufacturing License:", error);
        res.status(500).json({ message: "Error retrieving Food Manufacturing License", error: error.message });
    }
};

// Update Food Manufacturing License
export const updateFoodManufacturingLicense = async (req, res) => {
    try {
        // Trim spaces from keys
        const trimmedFields = {};
        for (const key in req.fields) {
            if (req.fields.hasOwnProperty(key)) {
                trimmedFields[key.trim()] = req.fields[key];
            }
        }

        const {
            licenseRequireYears,
            fullName,
            businessName,
            natureOfBusiness,
            ownerQualification,
            email,
            mobileNumber,
            businessAddress
        } = trimmedFields;

        // Convert files to buffers if they exist
        const aadharCard = req.files['documents.aadharCard'] ? {
            data: fs.readFileSync(req.files['documents.aadharCard'].path),
            contentType: req.files['documents.aadharCard'].type
        } : undefined;

        const panCard = req.files['documents.panCard'] ? {
            data: fs.readFileSync(req.files['documents.panCard'].path),
            contentType: req.files['documents.panCard'].type
        } : undefined;

        const photo = req.files['documents.photo'] ? {
            data: fs.readFileSync(req.files['documents.photo'].path),
            contentType: req.files['documents.photo'].type
        } : undefined;

        const electricBill = req.files['documents.electricBill'] ? {
            data: fs.readFileSync(req.files['documents.electricBill'].path),
            contentType: req.files['documents.electricBill'].type
        } : undefined;

        const rentAgreement = req.files['documents.rentAgreement'] ? {
            data: fs.readFileSync(req.files['documents.rentAgreement'].path),
            contentType: req.files['documents.rentAgreement'].type
        } : undefined;

        const updatedLicense = await FoodManufacturingLicense.findByIdAndUpdate(
            req.params.id,
            {
                licenseRequireYears,
                fullName,
                businessName,
                natureOfBusiness,
                ownerQualification,
                email,
                mobileNumber,
                businessAddress,
                documents: {
                    aadharCard,
                    panCard,
                    photo,
                    electricBill,
                    rentAgreement
                }
            },
            { new: true }
        );

        if (!updatedLicense) {
            return res.status(404).json({ message: "Food Manufacturing License not found" });
        }

        res.status(200).json({ message: "Food Manufacturing License updated successfully", updatedLicense });
    } catch (error) {
        console.error("Error updating Food Manufacturing License:", error);
        res.status(500).json({ message: "Error updating Food Manufacturing License", error: error.message });
    }
};

// Delete Food Manufacturing License
export const deleteFoodManufacturingLicense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLicense = await FoodManufacturingLicense.findByIdAndDelete(id);

        if (!deletedLicense) {
            return res.status(404).json({ message: "Food Manufacturing License not found" });
        }

        res.status(200).json({ message: "Food Manufacturing License deleted successfully" });
    } catch (error) {
        console.error("Error deleting Food Manufacturing License:", error);
        res.status(500).json({ message: "Error deleting Food Manufacturing License", error: error.message });
    }
};
