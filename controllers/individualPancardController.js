import IndividualPanCard from "../models/individualPanCard.js";
import fs from "fs";

// Create Individual PAN Card
export const createIndividualPanCard = async (req, res) => {
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
            nameAsPerPancard,
            fatherFullName,
            gender,
            dateOfBirth,
            address,
            pincode,
            mobileNumber,
            email,
            adharNumber,
            nameAsPerAadhar
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

        const passportPhoto = req.files['documents.passportPhoto'] ? {
            data: fs.readFileSync(req.files['documents.passportPhoto'].path),
            contentType: req.files['documents.passportPhoto'].type
        } : undefined;

        const newPanCard = new IndividualPanCard({
            fullName,
            nameAsPerPancard,
            fatherFullName,
            gender,
            dateOfBirth,
            address,
            pincode,
            mobileNumber,
            email,
            adharNumber,
            nameAsPerAadhar,
            documents: {
                aadharCard,
                signature,
                passportPhoto
            }
        });

        await newPanCard.save();

        res.status(201).json({ message: "Individual PAN Card created successfully", newPanCard });
    } catch (error) {
        console.error("Error creating Individual PAN Card:", error);
        res.status(500).json({ message: "Error creating Individual PAN Card", error: error.message });
    }
};

// Get All Individual PAN Cards
export const getAllIndividualPanCards = async (req, res) => {
    try {
        const panCards = await IndividualPanCard.find();
        res.status(200).json({ panCards });
    } catch (error) {
        console.error("Error retrieving Individual PAN Cards:", error);
        res.status(500).json({ message: "Error retrieving Individual PAN Cards", error: error.message });
    }
};

// Get Individual PAN Card by ID
export const getIndividualPanCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const panCard = await IndividualPanCard.findById(id);

        if (!panCard) {
            return res.status(404).json({ message: "Individual PAN Card not found" });
        }

        res.status(200).json({ panCard });
    } catch (error) {
        console.error("Error retrieving Individual PAN Card:", error);
        res.status(500).json({ message: "Error retrieving Individual PAN Card", error: error.message });
    }
};

// Update Individual PAN Card
export const updateIndividualPanCard = async (req, res) => {
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
            nameAsPerPancard,
            fatherFullName,
            gender,
            dateOfBirth,
            address,
            pincode,
            mobileNumber,
            email,
            adharNumber,
            nameAsPerAadhar
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

        const passportPhoto = req.files['documents.passportPhoto'] ? {
            data: fs.readFileSync(req.files['documents.passportPhoto'].path),
            contentType: req.files['documents.passportPhoto'].type
        } : undefined;

        const updatedPanCard = await IndividualPanCard.findByIdAndUpdate(
            req.params.id,
            {
                fullName,
                nameAsPerPancard,
                fatherFullName,
                gender,
                dateOfBirth,
                address,
                pincode,
                mobileNumber,
                email,
                adharNumber,
                nameAsPerAadhar,
                documents: {
                    aadharCard,
                    signature,
                    passportPhoto
                }
            },
            { new: true }
        );

        if (!updatedPanCard) {
            return res.status(404).json({ message: "Individual PAN Card not found" });
        }

        res.status(200).json({ message: "Individual PAN Card updated successfully", updatedPanCard });
    } catch (error) {
        console.error("Error updating Individual PAN Card:", error);
        res.status(500).json({ message: "Error updating Individual PAN Card", error: error.message });
    }
};

// Delete Individual PAN Card
export const deleteIndividualPanCard = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPanCard = await IndividualPanCard.findByIdAndDelete(id);

        if (!deletedPanCard) {
            return res.status(404).json({ message: "Individual PAN Card not found" });
        }

        res.status(200).json({ message: "Individual PAN Card deleted successfully" });
    } catch (error) {
        console.error("Error deleting Individual PAN Card:", error);
        res.status(500).json({ message: "Error deleting Individual PAN Card", error: error.message });
    }
};
