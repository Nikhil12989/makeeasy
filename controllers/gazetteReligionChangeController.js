import GazetteReligionChange from "../models/gazetteReligionChange.js";
import fs from "fs";

// Create Gazette Religion Change
export const createGazetteReligionChange = async (req, res) => {
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
            oldReligion,
            newReligion
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

        const religionChangeAffidavit = req.files.religionChangeAffidavit ? {
            data: fs.readFileSync(req.files.religionChangeAffidavit.path),
            contentType: req.files.religionChangeAffidavit.type
        } : undefined;

        const newGazetteReligionChange = new GazetteReligionChange({
            type,
            casteType,
            reasonForChange,
            fullName,
            mobileNumber,
            email,
            address,
            gender,
            dateOfBirth,
            oldReligion,
            newReligion,
            documents: {
                aadharCard,
                photo,
                signature,
                schoolLC,
                religionChangeAffidavit
            }
        });

        await newGazetteReligionChange.save();

        res.status(201).json({ message: "Gazette Religion Change created successfully", newGazetteReligionChange });
    } catch (error) {
        console.error("Error creating Gazette Religion Change:", error);
        res.status(500).json({ message: "Error creating Gazette Religion Change", error: error.message });
    }
};

// Get All Gazette Religion Changes
export const getAllGazetteReligionChanges = async (req, res) => {
    try {
        const gazetteReligionChanges = await GazetteReligionChange.find();
        res.status(200).json({ gazetteReligionChanges });
    } catch (error) {
        console.error("Error retrieving Gazette Religion Changes:", error);
        res.status(500).json({ message: "Error retrieving Gazette Religion Changes", error: error.message });
    }
};

// Get Gazette Religion Change by ID
export const getGazetteReligionChangeById = async (req, res) => {
    try {
        const { id } = req.params;
        const gazetteReligionChange = await GazetteReligionChange.findById(id);

        if (!gazetteReligionChange) {
            return res.status(404).json({ message: "Gazette Religion Change not found" });
        }

        res.status(200).json({ gazetteReligionChange });
    } catch (error) {
        console.error("Error retrieving Gazette Religion Change:", error);
        res.status(500).json({ message: "Error retrieving Gazette Religion Change", error: error.message });
    }
};

// Update Gazette Religion Change
export const updateGazetteReligionChange = async (req, res) => {
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
            oldReligion,
            newReligion
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

        const religionChangeAffidavit = req.files.religionChangeAffidavit ? {
            data: fs.readFileSync(req.files.religionChangeAffidavit.path),
            contentType: req.files.religionChangeAffidavit.type
        } : undefined;

        const updatedGazetteReligionChange = await GazetteReligionChange.findByIdAndUpdate(
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
                oldReligion,
                newReligion,
                documents: {
                    aadharCard,
                    photo,
                    signature,
                    schoolLC,
                    religionChangeAffidavit
                }
            },
            { new: true }
        );

        if (!updatedGazetteReligionChange) {
            return res.status(404).json({ message: "Gazette Religion Change not found" });
        }

        res.status(200).json({ message: "Gazette Religion Change updated successfully", updatedGazetteReligionChange });
    } catch (error) {
        console.error("Error updating Gazette Religion Change:", error);
        res.status(500).json({ message: "Error updating Gazette Religion Change", error: error.message });
    }
};

// Delete Gazette Religion Change
export const deleteGazetteReligionChange = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGazetteReligionChange = await GazetteReligionChange.findByIdAndDelete(id);

        if (!deletedGazetteReligionChange) {
            return res.status(404).json({ message: "Gazette Religion Change not found" });
        }

        res.status(200).json({ message: "Gazette Religion Change deleted successfully" });
    } catch (error) {
        console.error("Error deleting Gazette Religion Change:", error);
        res.status(500).json({ message: "Error deleting Gazette Religion Change", error: error.message });
    }
};
