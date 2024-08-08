import CompanyRegistration from "../models/companyRegistration.js";
import fs from "fs";

// Create Company Registration
export const createCompanyRegistration = async (req, res) => {
    try {
        // Trim spaces from keys
        const trimmedFields = {};
        for (const key in req.fields) {
            if (req.fields.hasOwnProperty(key)) {
                trimmedFields[key.trim()] = req.fields[key];
            }
        }

        const {
            fullName,
            companyName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth
        } = trimmedFields;

        // Convert files to buffers if they exist
        const aadharCard = req.files['documents.aadharCard'] ? {
            data: fs.readFileSync(req.files['documents.aadharCard'].path),
            contentType: req.files['documents.aadharCard'].type
        } : undefined;

        const pancard = req.files['documents.pancard'] ? {
            data: fs.readFileSync(req.files['documents.pancard'].path),
            contentType: req.files['documents.pancard'].type
        } : undefined;

        const electricBill = req.files['documents.electricBill'] ? {
            data: fs.readFileSync(req.files['documents.electricBill'].path),
            contentType: req.files['documents.electricBill'].type
        } : undefined;

        const photo = req.files['documents.photo'] ? {
            data: fs.readFileSync(req.files['documents.photo'].path),
            contentType: req.files['documents.photo'].type
        } : undefined;

        const newRegistration = new CompanyRegistration({
            fullName,
            companyName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth,
            documents: {
                aadharCard,
                pancard,
                electricBill,
                photo
            }
        });

        await newRegistration.save();

        res.status(201).json({ message: "Company Registration created successfully", newRegistration });
    } catch (error) {
        console.error("Error creating Company Registration:", error);
        res.status(500).json({ message: "Error creating Company Registration", error: error.message });
    }
};

// Get All Company Registrations
export const getAllCompanyRegistrations = async (req, res) => {
    try {
        const registrations = await CompanyRegistration.find();
        res.status(200).json({ registrations });
    } catch (error) {
        console.error("Error retrieving Company Registrations:", error);
        res.status(500).json({ message: "Error retrieving Company Registrations", error: error.message });
    }
};

// Get Company Registration by ID
export const getCompanyRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await CompanyRegistration.findById(id);

        if (!registration) {
            return res.status(404).json({ message: "Company Registration not found" });
        }

        res.status(200).json({ registration });
    } catch (error) {
        console.error("Error retrieving Company Registration:", error);
        res.status(500).json({ message: "Error retrieving Company Registration", error: error.message });
    }
};

// Update Company Registration
export const updateCompanyRegistration = async (req, res) => {
    try {
        // Trim spaces from keys
        const trimmedFields = {};
        for (const key in req.fields) {
            if (req.fields.hasOwnProperty(key)) {
                trimmedFields[key.trim()] = req.fields[key];
            }
        }

        const {
            fullName,
            companyName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth
        } = trimmedFields;

        // Convert files to buffers if they exist
        const aadharCard = req.files['documents.aadharCard'] ? {
            data: fs.readFileSync(req.files['documents.aadharCard'].path),
            contentType: req.files['documents.aadharCard'].type
        } : undefined;

        const pancard = req.files['documents.pancard'] ? {
            data: fs.readFileSync(req.files['documents.pancard'].path),
            contentType: req.files['documents.pancard'].type
        } : undefined;

        const electricBill = req.files['documents.electricBill'] ? {
            data: fs.readFileSync(req.files['documents.electricBill'].path),
            contentType: req.files['documents.electricBill'].type
        } : undefined;

        const photo = req.files['documents.photo'] ? {
            data: fs.readFileSync(req.files['documents.photo'].path),
            contentType: req.files['documents.photo'].type
        } : undefined;

        const updatedRegistration = await CompanyRegistration.findByIdAndUpdate(
            req.params.id,
            {
                fullName,
                companyName,
                email,
                address,
                pincode,
                mobileNumber,
                dateOfBirth,
                documents: {
                    aadharCard,
                    pancard,
                    electricBill,
                    photo
                }
            },
            { new: true }
        );

        if (!updatedRegistration) {
            return res.status(404).json({ message: "Company Registration not found" });
        }

        res.status(200).json({ message: "Company Registration updated successfully", updatedRegistration });
    } catch (error) {
        console.error("Error updating Company Registration:", error);
        res.status(500).json({ message: "Error updating Company Registration", error: error.message });
    }
};

// Delete Company Registration
export const deleteCompanyRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRegistration = await CompanyRegistration.findByIdAndDelete(id);

        if (!deletedRegistration) {
            return res.status(404).json({ message: "Company Registration not found" });
        }

        res.status(200).json({ message: "Company Registration deleted successfully" });
    } catch (error) {
        console.error("Error deleting Company Registration:", error);
        res.status(500).json({ message: "Error deleting Company Registration", error: error.message });
    }
};
