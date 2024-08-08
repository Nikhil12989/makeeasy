import IncomeCertificate from "../models/incomeCertificate.js";
import fs from "fs";

// Create Income Certificate
export const createIncomeCertificate = async (req, res) => {
    try {
        const {
            fullNameEnglish,
            fullNameMarathi,
            fatherFullNameEnglish,
            fatherFullNameMarathi,
            incomeCertificate,
            dateOfBirth,
            age,
            gender,
            mobileNumber,
            service,
            address,
            state,
            district,
            pincode,
            sourceOfIncome,
            purposeOfIncomeCertificate
        } = req.fields;

        const rationCard = req.files.rationCard ? {
            data: fs.readFileSync(req.files.rationCard.path),
            contentType: req.files.rationCard.type
        } : undefined;

        const aadharCard = req.files.aadharCard ? {
            data: fs.readFileSync(req.files.aadharCard.path),
            contentType: req.files.aadharCard.type
        } : undefined;

        const photoIdentity = req.files.photoIdentity ? {
            data: fs.readFileSync(req.files.photoIdentity.path),
            contentType: req.files.photoIdentity.type
        } : undefined;

        const signature = req.files.signature ? {
            data: fs.readFileSync(req.files.signature.path),
            contentType: req.files.signature.type
        } : undefined;

        const talithiIncome = req.files.talithiIncome ? {
            data: fs.readFileSync(req.files.talithiIncome.path),
            contentType: req.files.talithiIncome.type
        } : undefined;

        const newIncomeCertificate = new IncomeCertificate({
            fullNameEnglish,
            fullNameMarathi,
            fatherFullNameEnglish,
            fatherFullNameMarathi,
            incomeCertificate,
            dateOfBirth,
            age,
            gender,
            mobileNumber,
            service,
            address,
            state,
            district,
            pincode,
            sourceOfIncome,
            purposeOfIncomeCertificate,
            documents: {
                rationCard,
                aadharCard,
                photoIdentity,
                signature,
                talithiIncome
            }
        });

        await newIncomeCertificate.save();

        res.status(201).json({ message: "Income Certificate created successfully", newIncomeCertificate });
    } catch (error) {
        console.error("Error creating Income Certificate:", error);
        res.status(500).json({ message: "Error creating Income Certificate", error: error.message });
    }
};

// Get All Income Certificates
export const getAllIncomeCertificates = async (req, res) => {
    try {
        const incomeCertificates = await IncomeCertificate.find();
        res.status(200).json({ incomeCertificates });
    } catch (error) {
        console.error("Error retrieving Income Certificates:", error);
        res.status(500).json({ message: "Error retrieving Income Certificates", error: error.message });
    }
};

// Get Income Certificate by ID
export const getIncomeCertificateById = async (req, res) => {
    try {
        const { id } = req.params;
        const incomeCertificate = await IncomeCertificate.findById(id);

        if (!incomeCertificate) {
            return res.status(404).json({ message: "Income Certificate not found" });
        }

        res.status(200).json({ incomeCertificate });
    } catch (error) {
        console.error("Error retrieving Income Certificate:", error);
        res.status(500).json({ message: "Error retrieving Income Certificate", error: error.message });
    }
};

// Update Income Certificate
export const updateIncomeCertificate = async (req, res) => {
    try {
        const {
            fullNameEnglish,
            fullNameMarathi,
            fatherFullNameEnglish,
            fatherFullNameMarathi,
            incomeCertificate,
            dateOfBirth,
            age,
            gender,
            mobileNumber,
            service,
            address,
            state,
            district,
            pincode,
            sourceOfIncome,
            purposeOfIncomeCertificate
        } = req.fields;

        const rationCard = req.files.rationCard ? {
            data: fs.readFileSync(req.files.rationCard.path),
            contentType: req.files.rationCard.type
        } : undefined;

        const aadharCard = req.files.aadharCard ? {
            data: fs.readFileSync(req.files.aadharCard.path),
            contentType: req.files.aadharCard.type
        } : undefined;

        const photoIdentity = req.files.photoIdentity ? {
            data: fs.readFileSync(req.files.photoIdentity.path),
            contentType: req.files.photoIdentity.type
        } : undefined;

        const signature = req.files.signature ? {
            data: fs.readFileSync(req.files.signature.path),
            contentType: req.files.signature.type
        } : undefined;

        const talithiIncome = req.files.talithiIncome ? {
            data: fs.readFileSync(req.files.talithiIncome.path),
            contentType: req.files.talithiIncome.type
        } : undefined;

        const updatedIncomeCertificate = await IncomeCertificate.findByIdAndUpdate(
            req.params.id,
            {
                fullNameEnglish,
                fullNameMarathi,
                fatherFullNameEnglish,
                fatherFullNameMarathi,
                incomeCertificate,
                dateOfBirth,
                age,
                gender,
                mobileNumber,
                service,
                address,
                state,
                district,
                pincode,
                sourceOfIncome,
                purposeOfIncomeCertificate,
                documents: {
                    rationCard,
                    aadharCard,
                    photoIdentity,
                    signature,
                    talithiIncome
                }
            },
            { new: true }
        );

        if (!updatedIncomeCertificate) {
            return res.status(404).json({ message: "Income Certificate not found" });
        }

        res.status(200).json({ message: "Income Certificate updated successfully", updatedIncomeCertificate });
    } catch (error) {
        console.error("Error updating Income Certificate:", error);
        res.status(500).json({ message: "Error updating Income Certificate", error: error.message });
    }
};

// Delete Income Certificate
export const deleteIncomeCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIncomeCertificate = await IncomeCertificate.findByIdAndDelete(id);

        if (!deletedIncomeCertificate) {
            return res.status(404).json({ message: "Income Certificate not found" });
        }

        res.status(200).json({ message: "Income Certificate deleted successfully" });
    } catch (error) {
        console.error("Error deleting Income Certificate:", error);
        res.status(500).json({ message: "Error deleting Income Certificate", error: error.message });
    }
};
