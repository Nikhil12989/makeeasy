import LocalFoodLicense from "../models/localFoodLicense.js";
import fs from "fs";

// Create Local Food License
export const createLocalFoodLicense = async (req, res) => {
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

        const rentAggrement = req.files['documents.rentAggrement'] ? {
            data: fs.readFileSync(req.files['documents.rentAggrement'].path),
            contentType: req.files['documents.rentAggrement'].type
        } : undefined;

        const newLicense = new LocalFoodLicense({
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
                rentAggrement
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "Local Food License created successfully", newLicense });
    } catch (error) {
        console.error("Error creating Local Food License:", error);
        res.status(500).json({ message: "Error creating Local Food License", error: error.message });
    }
};

// Get All Local Food Licenses
export const getAllLocalFoodLicenses = async (req, res) => {
    try {
        const licenses = await LocalFoodLicense.find();
        res.status(200).json({ licenses });
    } catch (error) {
        console.error("Error retrieving Local Food Licenses:", error);
        res.status(500).json({ message: "Error retrieving Local Food Licenses", error: error.message });
    }
};

// Get Local Food License by ID
export const getLocalFoodLicenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const license = await LocalFoodLicense.findById(id);

        if (!license) {
            return res.status(404).json({ message: "Local Food License not found" });
        }

        res.status(200).json({ license });
    } catch (error) {
        console.error("Error retrieving Local Food License:", error);
        res.status(500).json({ message: "Error retrieving Local Food License", error: error.message });
    }
};
