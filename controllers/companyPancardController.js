import CompanyPancard from "../models/companyPancard.js";
import fs from "fs";

// Create Company Pancard
export const createCompanyPancard = async (req, res) => {
    try {
        // Trim spaces from keys
        const trimmedFields = {};
        for (const key in req.fields) {
            if (req.fields.hasOwnProperty(key)) {
                trimmedFields[key.trim()] = req.fields[key];
            }
        }

        const {
            companyFullName,
            CompanyNameAsPerPancard,
            gender,
            dateOfBirth,
            companyAddress,
            pincode,
            mobileNumber,
            email,
            companyRegisterNumber,
            ownerFullName
        } = trimmedFields;

        // Convert files to buffers if they exist
        const aadharCard = req.files['documents.aadharCard'] ? {
            data: fs.readFileSync(req.files['documents.aadharCard'].path),
            contentType: req.files['documents.aadharCard'].type
        } : undefined;

        const signature = req.files['documents.signature'] ? {
            data: fs.readFileSync(req.files['documents.signature'].path),
            contentType: req.files['documents.signature'].type
        } : undefined;

        const photo = req.files['documents.photo'] ? {
            data: fs.readFileSync(req.files['documents.photo'].path),
            contentType: req.files['documents.photo'].type
        } : undefined;

        const registerCertificate = req.files['documents.registerCertificate'] ? {
            data: fs.readFileSync(req.files['documents.registerCertificate'].path),
            contentType: req.files['documents.registerCertificate'].type
        } : undefined;

        const newPancard = new CompanyPancard({
            companyFullName,
            CompanyNameAsPerPancard,
            gender,
            dateOfBirth,
            companyAddress,
            pincode,
            mobileNumber,
            email,
            companyRegisterNumber,
            ownerFullName,
            documents: {
                aadharCard,
                signature,
                photo,
                registerCertificate
            }
        });

        await newPancard.save();

        res.status(201).json({ message: "Company Pancard created successfully", newPancard });
    } catch (error) {
        console.error("Error creating Company Pancard:", error);
        res.status(500).json({ message: "Error creating Company Pancard", error: error.message });
    }
};

// Get All Company Pancards
export const getAllCompanyPancards = async (req, res) => {
    try {
        const pancards = await CompanyPancard.find();
        res.status(200).json({ pancards });
    } catch (error) {
        console.error("Error retrieving Company Pancards:", error);
        res.status(500).json({ message: "Error retrieving Company Pancards", error: error.message });
    }
};

// Get Company Pancard by ID
export const getCompanyPancardById = async (req, res) => {
    try {
        const { id } = req.params;
        const pancard = await CompanyPancard.findById(id);

        if (!pancard) {
            return res.status(404).json({ message: "Company Pancard not found" });
        }

        res.status(200).json({ pancard });
    } catch (error) {
        console.error("Error retrieving Company Pancard:", error);
        res.status(500).json({ message: "Error retrieving Company Pancard", error: error.message });
    }
};

// Update Company Pancard
export const updateCompanyPancard = async (req, res) => {
    try {
        // Trim spaces from keys
        const trimmedFields = {};
        for (const key in req.fields) {
            if (req.fields.hasOwnProperty(key)) {
                trimmedFields[key.trim()] = req.fields[key];
            }
        }

        const {
            companyFullName,
            CompanyNameAsPerPancard,
            gender,
            dateOfBirth,
            companyAddress,
            pincode,
            mobileNumber,
            email,
            companyRegisterNumber,
            ownerFullName
        } = trimmedFields;

        // Convert files to buffers if they exist
        const aadharCard = req.files['documents.aadharCard'] ? {
            data: fs.readFileSync(req.files['documents.aadharCard'].path),
            contentType: req.files['documents.aadharCard'].type
        } : undefined;

        const signature = req.files['documents.signature'] ? {
            data: fs.readFileSync(req.files['documents.signature'].path),
            contentType: req.files['documents.signature'].type
        } : undefined;

        const photo = req.files['documents.photo'] ? {
            data: fs.readFileSync(req.files['documents.photo'].path),
            contentType: req.files['documents.photo'].type
        } : undefined;

        const registerCertificate = req.files['documents.registerCertificate'] ? {
            data: fs.readFileSync(req.files['documents.registerCertificate'].path),
            contentType: req.files['documents.registerCertificate'].type
        } : undefined;

        const updatedPancard = await CompanyPancard.findByIdAndUpdate(
            req.params.id,
            {
                companyFullName,
                CompanyNameAsPerPancard,
                gender,
                dateOfBirth,
                companyAddress,
                pincode,
                mobileNumber,
                email,
                companyRegisterNumber,
                ownerFullName,
                documents: {
                    aadharCard,
                    signature,
                    photo,
                    registerCertificate
                }
            },
            { new: true }
        );

        if (!updatedPancard) {
            return res.status(404).json({ message: "Company Pancard not found" });
        }

        res.status(200).json({ message: "Company Pancard updated successfully", updatedPancard });
    } catch (error) {
        console.error("Error updating Company Pancard:", error);
        res.status(500).json({ message: "Error updating Company Pancard", error: error.message });
    }
};

// Delete Company Pancard
export const deleteCompanyPancard = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPancard = await CompanyPancard.findByIdAndDelete(id);

        if (!deletedPancard) {
            return res.status(404).json({ message: "Company Pancard not found" });
        }

        res.status(200).json({ message: "Company Pancard deleted successfully" });
    } catch (error) {
        console.error("Error deleting Company Pancard:", error);
        res.status(500).json({ message: "Error deleting Company Pancard", error: error.message });
    }
};
