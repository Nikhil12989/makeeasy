import GazetteNameChange from "../models/gazetteNameChange.js";
import fs from "fs";

// Create Gazette Name Change
export const createGazetteNameChange = async (req, res) => {
    try {
        const {
            type,
            casteType,
            reasonForChange,
            fullName,
            mobileNumber,
            email,
            address,
            gender,
            dateOfBirth,
            oldName,
            newName
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: fs.readFileSync(req.files.aadharCard.path),
            contentType: req.files.aadharCard.type
        } : undefined;

        const photo = req.files.photo ? {
            data: fs.readFileSync(req.files.photo.path),
            contentType: req.files.photo.type
        } : undefined;

        const signature = req.files.signature ? {
            data: fs.readFileSync(req.files.signature.path),
            contentType: req.files.signature.type
        } : undefined;

        const schoolLC = req.files.schoolLC ? {
            data: fs.readFileSync(req.files.schoolLC.path),
            contentType: req.files.schoolLC.type
        } : undefined;

        const nameChangeAffidavit = req.files.nameChangeAffidavit ? {
            data: fs.readFileSync(req.files.nameChangeAffidavit.path),
            contentType: req.files.nameChangeAffidavit.type
        } : undefined;

        const newGazetteNameChange = new GazetteNameChange({
            type,
            casteType,
            reasonForChange,
            fullName,
            mobileNumber,
            email,
            address,
            gender,
            dateOfBirth,
            oldName,
            newName,
            documents: {
                aadharCard,
                photo,
                signature,
                schoolLC,
                nameChangeAffidavit
            }
        });

        await newGazetteNameChange.save();

        res.status(201).json({ message: "Gazette Name Change created successfully", newGazetteNameChange });
    } catch (error) {
        console.error("Error creating Gazette Name Change:", error);
        res.status(500).json({ message: "Error creating Gazette Name Change", error: error.message });
    }
};

// Get All Gazette Name Changes
export const getAllGazetteNameChanges = async (req, res) => {
    try {
        const gazetteNameChanges = await GazetteNameChange.find();
        res.status(200).json({ gazetteNameChanges });
    } catch (error) {
        console.error("Error retrieving Gazette Name Changes:", error);
        res.status(500).json({ message: "Error retrieving Gazette Name Changes", error: error.message });
    }
};

// Get Gazette Name Change by ID
export const getGazetteNameChangeById = async (req, res) => {
    try {
        const { id } = req.params;
        const gazetteNameChange = await GazetteNameChange.findById(id);

        if (!gazetteNameChange) {
            return res.status(404).json({ message: "Gazette Name Change not found" });
        }

        res.status(200).json({ gazetteNameChange });
    } catch (error) {
        console.error("Error retrieving Gazette Name Change:", error);
        res.status(500).json({ message: "Error retrieving Gazette Name Change", error: error.message });
    }
};

// Update Gazette Name Change
export const updateGazetteNameChange = async (req, res) => {
    try {
        const {
            type,
            casteType,
            reasonForChange,
            fullName,
            mobileNumber,
            email,
            address,
            gender,
            dateOfBirth,
            oldName,
            newName
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: fs.readFileSync(req.files.aadharCard.path),
            contentType: req.files.aadharCard.type
        } : undefined;

        const photo = req.files.photo ? {
            data: fs.readFileSync(req.files.photo.path),
            contentType: req.files.photo.type
        } : undefined;

        const signature = req.files.signature ? {
            data: fs.readFileSync(req.files.signature.path),
            contentType: req.files.signature.type
        } : undefined;

        const schoolLC = req.files.schoolLC ? {
            data: fs.readFileSync(req.files.schoolLC.path),
            contentType: req.files.schoolLC.type
        } : undefined;

        const nameChangeAffidavit = req.files.nameChangeAffidavit ? {
            data: fs.readFileSync(req.files.nameChangeAffidavit.path),
            contentType: req.files.nameChangeAffidavit.type
        } : undefined;

        const updatedGazetteNameChange = await GazetteNameChange.findByIdAndUpdate(
            req.params.id,
            {
                type,
                casteType,
                reasonForChange,
                fullName,
                mobileNumber,
                email,
                address,
                gender,
                dateOfBirth,
                oldName,
                newName,
                documents: {
                    aadharCard,
                    photo,
                    signature,
                    schoolLC,
                    nameChangeAffidavit
                }
            },
            { new: true }
        );

        if (!updatedGazetteNameChange) {
            return res.status(404).json({ message: "Gazette Name Change not found" });
        }

        res.status(200).json({ message: "Gazette Name Change updated successfully", updatedGazetteNameChange });
    } catch (error) {
        console.error("Error updating Gazette Name Change:", error);
        res.status(500).json({ message: "Error updating Gazette Name Change", error: error.message });
    }
};

// Delete Gazette Name Change
export const deleteGazetteNameChange = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGazetteNameChange = await GazetteNameChange.findByIdAndDelete(id);

        if (!deletedGazetteNameChange) {
            return res.status(404).json({ message: "Gazette Name Change not found" });
        }

        res.status(200).json({ message: "Gazette Name Change deleted successfully" });
    } catch (error) {
        console.error("Error deleting Gazette Name Change:", error);
        res.status(500).json({ message: "Error deleting Gazette Name Change", error: error.message });
    }
};
