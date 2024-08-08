import ReIssuePassport from "../models/reIssuePassport.js";
import fs from "fs";

// Create Re-Issue Passport
export const createReIssuePassport = async (req, res) => {
    try {
        const {
            typeOfApplication,
            typeOfPassport,
            reasonOfReIssue,
            oldPassportNumber,
            fileNumber,
            passportIssueDate,
            passportExpiryDate,
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

        const newReIssuePassport = new ReIssuePassport({
            typeOfApplication,
            typeOfPassport,
            reasonOfReIssue,
            oldPassportNumber,
            fileNumber,
            passportIssueDate,
            passportExpiryDate,
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

        await newReIssuePassport.save();

        res.status(201).json({ message: "Re-Issue Passport created successfully", newReIssuePassport });
    } catch (error) {
        console.error("Error creating Re-Issue Passport:", error);
        res.status(500).json({ message: "Error creating Re-Issue Passport", error: error.message });
    }
};

// Get All Re-Issue Passports
export const getAllReIssuePassports = async (req, res) => {
    try {
        const reIssuePassports = await ReIssuePassport.find();
        res.status(200).json({ reIssuePassports });
    } catch (error) {
        console.error("Error retrieving Re-Issue Passports:", error);
        res.status(500).json({ message: "Error retrieving Re-Issue Passports", error: error.message });
    }
};

// Get Re-Issue Passport by ID
export const getReIssuePassportById = async (req, res) => {
    try {
        const { id } = req.params;
        const reIssuePassport = await ReIssuePassport.findById(id);

        if (!reIssuePassport) {
            return res.status(404).json({ message: "Re-Issue Passport not found" });
        }

        res.status(200).json({ reIssuePassport });
    } catch (error) {
        console.error("Error retrieving Re-Issue Passport:", error);
        res.status(500).json({ message: "Error retrieving Re-Issue Passport", error: error.message });
    }
};

// Update Re-Issue Passport
export const updateReIssuePassport = async (req, res) => {
    try {
        const {
            typeOfApplication,
            typeOfPassport,
            reasonOfReIssue,
            oldPassportNumber,
            fileNumber,
            passportIssueDate,
            passportExpiryDate,
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

        const updatedReIssuePassport = await ReIssuePassport.findByIdAndUpdate(
            req.params.id,
            {
                typeOfApplication,
                typeOfPassport,
                reasonOfReIssue,
                oldPassportNumber,
                fileNumber,
                passportIssueDate,
                passportExpiryDate,
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

        if (!updatedReIssuePassport) {
            return res.status(404).json({ message: "Re-Issue Passport not found" });
        }

        res.status(200).json({ message: "Re-Issue Passport updated successfully", updatedReIssuePassport });
    } catch (error) {
        console.error("Error updating Re-Issue Passport:", error);
        res.status(500).json({ message: "Error updating Re-Issue Passport", error: error.message });
    }
};

// Delete Re-Issue Passport
export const deleteReIssuePassport = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReIssuePassport = await ReIssuePassport.findByIdAndDelete(id);

        if (!deletedReIssuePassport) {
            return res.status(404).json({ message: "Re-Issue Passport not found" });
        }

        res.status(200).json({ message: "Re-Issue Passport deleted successfully" });
    } catch (error) {
        console.error("Error deleting Re-Issue Passport:", error);
        res.status(500).json({ message: "Error deleting Re-Issue Passport", error: error.message });
    }
};
