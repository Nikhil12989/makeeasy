import GazetteDOBChange from "../models/gazatteDOBChange.js";
import fs from "fs";

// Create Gazette DOB Change
export const createGazetteDOBChange = async (req, res) => {
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
            oldDOB,
            newDOB
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

        const DOBChangeAffidavit = req.files.DOBChangeAffidavit ? {
            data: fs.readFileSync(req.files.DOBChangeAffidavit.path),
            contentType: req.files.DOBChangeAffidavit.type
        } : undefined;

        const newGazetteDOBChange = new GazetteDOBChange({
            type,
            casteType,
            reasonForChange,
            fullName,
            mobileNumber,
            email,
            address,
            gender,
            dateOfBirth,
            oldDOB,
            newDOB,
            documents: {
                aadharCard,
                photo,
                signature,
                schoolLC,
                DOBChangeAffidavit
            }
        });

        await newGazetteDOBChange.save();

        res.status(201).json({ message: "Gazette DOB Change created successfully", newGazetteDOBChange });
    } catch (error) {
        console.error("Error creating Gazette DOB Change:", error);
        res.status(500).json({ message: "Error creating Gazette DOB Change", error: error.message });
    }
};

// Get All Gazette DOB Changes
export const getAllGazetteDOBChanges = async (req, res) => {
    try {
        const gazetteDOBChanges = await GazetteDOBChange.find();
        res.status(200).json({ gazetteDOBChanges });
    } catch (error) {
        console.error("Error retrieving Gazette DOB Changes:", error);
        res.status(500).json({ message: "Error retrieving Gazette DOB Changes", error: error.message });
    }
};

// Get Gazette DOB Change by ID
export const getGazetteDOBChangeById = async (req, res) => {
    try {
        const { id } = req.params;
        const gazetteDOBChange = await GazetteDOBChange.findById(id);

        if (!gazetteDOBChange) {
            return res.status(404).json({ message: "Gazette DOB Change not found" });
        }

        res.status(200).json({ gazetteDOBChange });
    } catch (error) {
        console.error("Error retrieving Gazette DOB Change:", error);
        res.status(500).json({ message: "Error retrieving Gazette DOB Change", error: error.message });
    }
};

// Update Gazette DOB Change
export const updateGazetteDOBChange = async (req, res) => {
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
            oldDOB,
            newDOB
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

        const DOBChangeAffidavit = req.files.DOBChangeAffidavit ? {
            data: fs.readFileSync(req.files.DOBChangeAffidavit.path),
            contentType: req.files.DOBChangeAffidavit.type
        } : undefined;

        const updatedGazetteDOBChange = await GazetteDOBChange.findByIdAndUpdate(
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
                oldDOB,
                newDOB,
                documents: {
                    aadharCard,
                    photo,
                    signature,
                    schoolLC,
                    DOBChangeAffidavit
                }
            },
            { new: true }
        );

        if (!updatedGazetteDOBChange) {
            return res.status(404).json({ message: "Gazette DOB Change not found" });
        }

        res.status(200).json({ message: "Gazette DOB Change updated successfully", updatedGazetteDOBChange });
    } catch (error) {
        console.error("Error updating Gazette DOB Change:", error);
        res.status(500).json({ message: "Error updating Gazette DOB Change", error: error.message });
    }
};

// Delete Gazette DOB Change
export const deleteGazetteDOBChange = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGazetteDOBChange = await GazetteDOBChange.findByIdAndDelete(id);

        if (!deletedGazetteDOBChange) {
            return res.status(404).json({ message: "Gazette DOB Change not found" });
        }

        res.status(200).json({ message: "Gazette DOB Change deleted successfully" });
    } catch (error) {
        console.error("Error deleting Gazette DOB Change:", error);
        res.status(500).json({ message: "Error deleting Gazette DOB Change", error: error.message });
    }
};
