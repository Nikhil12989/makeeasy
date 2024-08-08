import StateFoodLicense from "../models/stateFoodLicense.js";
import fs from "fs";

// Create State Food License
export const createStateFoodLicense = async (req, res) => {
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

        const shopActLicense = req.files['documents.shopActLicense'] ? {
            data: fs.readFileSync(req.files['documents.shopActLicense'].path),
            contentType: req.files['documents.shopActLicense'].type
        } : undefined;

        const uddyamAadhar = req.files['documents.uddyamAadhar'] ? {
            data: fs.readFileSync(req.files['documents.uddyamAadhar'].path),
            contentType: req.files['documents.uddyamAadhar'].type
        } : undefined;

        const newLicense = new StateFoodLicense({
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
                rentAggrement,
                shopActLicense,
                uddyamAadhar
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "State Food License created successfully", newLicense });
    } catch (error) {
        console.error("Error creating State Food License:", error);
        res.status(500).json({ message: "Error creating State Food License", error: error.message });
    }
};

// Get All State Food Licenses
export const getAllStateFoodLicenses = async (req, res) => {
    try {
        const licenses = await StateFoodLicense.find();
        res.status(200).json({ licenses });
    } catch (error) {
        console.error("Error retrieving State Food Licenses:", error);
        res.status(500).json({ message: "Error retrieving State Food Licenses", error: error.message });
    }
};

// Get State Food License by ID
export const getStateFoodLicenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const license = await StateFoodLicense.findById(id);

        if (!license) {
            return res.status(404).json({ message: "State Food License not found" });
        }

        res.status(200).json({ license });
    } catch (error) {
        console.error("Error retrieving State Food License:", error);
        res.status(500).json({ message: "Error retrieving State Food License", error: error.message });
    }
};
