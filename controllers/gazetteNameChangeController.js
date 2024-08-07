import GazetteNameChange from "../models/gazetteNameChange.js";

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
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const photo = req.files.photo ? {
            data: req.files.photo.path,
            contentType: req.files.photo.type
        } : undefined;

        const signature = req.files.signature ? {
            data: req.files.signature.path,
            contentType: req.files.signature.type
        } : undefined;

        const schoolLC = req.files.schoolLC ? {
            data: req.files.schoolLC.path,
            contentType: req.files.schoolLC.type
        } : undefined;

        const nameChangeAffidavit = req.files.nameChangeAffidavit ? {
            data: req.files.nameChangeAffidavit.path,
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
        res.status(500).json({ message: "Error creating Gazette Name Change", error });
    }
};

// Get All Gazette Name Changes
export const getAllGazetteNameChanges = async (req, res) => {
    try {
        const gazetteNameChanges = await GazetteNameChange.find();
        res.status(200).json(gazetteNameChanges);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Gazette Name Changes", error });
    }
};

// Get Gazette Name Change by ID
export const getGazetteNameChangeById = async (req, res) => {
    try {
        const gazetteNameChange = await GazetteNameChange.findById(req.params.id);
        if (!gazetteNameChange) {
            return res.status(404).json({ message: "Gazette Name Change not found" });
        }
        res.status(200).json(gazetteNameChange);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Gazette Name Change", error });
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
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const photo = req.files.photo ? {
            data: req.files.photo.path,
            contentType: req.files.photo.type
        } : undefined;

        const signature = req.files.signature ? {
            data: req.files.signature.path,
            contentType: req.files.signature.type
        } : undefined;

        const schoolLC = req.files.schoolLC ? {
            data: req.files.schoolLC.path,
            contentType: req.files.schoolLC.type
        } : undefined;

        const nameChangeAffidavit = req.files.nameChangeAffidavit ? {
            data: req.files.nameChangeAffidavit.path,
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
        res.status(500).json({ message: "Error updating Gazette Name Change", error });
    }
};

// Delete Gazette Name Change
export const deleteGazetteNameChange = async (req, res) => {
    try {
        const deletedGazetteNameChange = await GazetteNameChange.findByIdAndDelete(req.params.id);
        if (!deletedGazetteNameChange) {
            return res.status(404).json({ message: "Gazette Name Change not found" });
        }
        res.status(200).json({ message: "Gazette Name Change deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Gazette Name Change", error });
    }
};
