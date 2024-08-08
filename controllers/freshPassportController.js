import FreshPassport from "../models/freshPassport.js";
import fs from "fs";

// Create Fresh Passport
export const createFreshPassport = async (req, res) => {
    try {
        const {
            typeOfApplication,
            typeOfPassport,
            fullName,
            mobileNumber,
            aadharNumber,
            email,
            gender,
            dateOfBirth,
            placeOfBirth,
            maritalStatus,
            fatherFullName,
            motherFullName,
            spouseFullName,
            presentAddress,
            permanentAddress,
            policeStation,
            educationQualification,
            emergencyContactFullName,
            emergencyContactNumber,
            emergencyContactAddress
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: fs.readFileSync(req.files.aadharCard.path),
            contentType: req.files.aadharCard.type
        } : undefined;

        const panCard = req.files.panCard ? {
            data: fs.readFileSync(req.files.panCard.path),
            contentType: req.files.panCard.type
        } : undefined;

        const newFreshPassport = new FreshPassport({
            typeOfApplication,
            typeOfPassport,
            fullName,
            mobileNumber,
            aadharNumber,
            email,
            gender,
            dateOfBirth,
            placeOfBirth,
            maritalStatus,
            fatherFullName,
            motherFullName,
            spouseFullName,
            presentAddress,
            permanentAddress,
            policeStation,
            educationQualification,
            emergencyContactFullName,
            emergencyContactNumber,
            emergencyContactAddress,
            documents: {
                aadharCard,
                panCard
            }
        });

        await newFreshPassport.save();

        res.status(201).json({ message: "Fresh Passport created successfully", newFreshPassport });
    } catch (error) {
        console.error("Error creating Fresh Passport:", error);
        res.status(500).json({ message: "Error creating Fresh Passport", error: error.message });
    }
};

// Get All Fresh Passports
export const getAllFreshPassports = async (req, res) => {
    try {
        const freshPassports = await FreshPassport.find();
        res.status(200).json({ freshPassports });
    } catch (error) {
        console.error("Error retrieving Fresh Passports:", error);
        res.status(500).json({ message: "Error retrieving Fresh Passports", error: error.message });
    }
};

// Get Fresh Passport by ID
export const getFreshPassportById = async (req, res) => {
    try {
        const { id } = req.params;
        const freshPassport = await FreshPassport.findById(id);

        if (!freshPassport) {
            return res.status(404).json({ message: "Fresh Passport not found" });
        }

        res.status(200).json({ freshPassport });
    } catch (error) {
        console.error("Error retrieving Fresh Passport:", error);
        res.status(500).json({ message: "Error retrieving Fresh Passport", error: error.message });
    }
};

// Update Fresh Passport
export const updateFreshPassport = async (req, res) => {
    try {
        const {
            typeOfApplication,
            typeOfPassport,
            fullName,
            mobileNumber,
            aadharNumber,
            email,
            gender,
            dateOfBirth,
            placeOfBirth,
            maritalStatus,
            fatherFullName,
            motherFullName,
            spouseFullName,
            presentAddress,
            permanentAddress,
            policeStation,
            educationQualification,
            emergencyContactFullName,
            emergencyContactNumber,
            emergencyContactAddress
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: fs.readFileSync(req.files.aadharCard.path),
            contentType: req.files.aadharCard.type
        } : undefined;

        const panCard = req.files.panCard ? {
            data: fs.readFileSync(req.files.panCard.path),
            contentType: req.files.panCard.type
        } : undefined;

        const updatedFreshPassport = await FreshPassport.findByIdAndUpdate(
            req.params.id,
            {
                typeOfApplication,
                typeOfPassport,
                fullName,
                mobileNumber,
                aadharNumber,
                email,
                gender,
                dateOfBirth,
                placeOfBirth,
                maritalStatus,
                fatherFullName,
                motherFullName,
                spouseFullName,
                presentAddress,
                permanentAddress,
                policeStation,
                educationQualification,
                emergencyContactFullName,
                emergencyContactNumber,
                emergencyContactAddress,
                documents: {
                    aadharCard,
                    panCard
                }
            },
            { new: true }
        );

        if (!updatedFreshPassport) {
            return res.status(404).json({ message: "Fresh Passport not found" });
        }

        res.status(200).json({ message: "Fresh Passport updated successfully", updatedFreshPassport });
    } catch (error) {
        console.error("Error updating Fresh Passport:", error);
        res.status(500).json({ message: "Error updating Fresh Passport", error: error.message });
    }
};

// Delete Fresh Passport
export const deleteFreshPassport = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFreshPassport = await FreshPassport.findByIdAndDelete(id);

        if (!deletedFreshPassport) {
            return res.status(404).json({ message: "Fresh Passport not found" });
        }

        res.status(200).json({ message: "Fresh Passport deleted successfully" });
    } catch (error) {
        console.error("Error deleting Fresh Passport:", error);
        res.status(500).json({ message: "Error deleting Fresh Passport", error: error.message });
    }
};
