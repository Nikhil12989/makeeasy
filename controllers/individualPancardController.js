import IndividualPanCard from "../models/individualPanCard.js";

// Create Individual PAN Card
export const createIndividualPanCard = async (req, res) => {
    try {
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
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const signature = req.files.signature ? {
            data: req.files.signature.path,
            contentType: req.files.signature.type
        } : undefined;

        const passportPhoto = req.files.passportPhoto ? {
            data: req.files.passportPhoto.path,
            contentType: req.files.passportPhoto.type
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
        res.status(500).json({ message: "Error creating Individual PAN Card", error });
    }
};

// Get All Individual PAN Cards
export const getAllIndividualPanCards = async (req, res) => {
    try {
        const panCards = await IndividualPanCard.find();
        res.status(200).json(panCards);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Individual PAN Cards", error });
    }
};

// Get Individual PAN Card by ID
export const getIndividualPanCardById = async (req, res) => {
    try {
        const panCard = await IndividualPanCard.findById(req.params.id);
        if (!panCard) {
            return res.status(404).json({ message: "Individual PAN Card not found" });
        }
        res.status(200).json(panCard);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Individual PAN Card", error });
    }
};

// Update Individual PAN Card
export const updateIndividualPanCard = async (req, res) => {
    try {
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
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const signature = req.files.signature ? {
            data: req.files.signature.path,
            contentType: req.files.signature.type
        } : undefined;

        const passportPhoto = req.files.passportPhoto ? {
            data: req.files.passportPhoto.path,
            contentType: req.files.passportPhoto.type
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
        res.status(500).json({ message: "Error updating Individual PAN Card", error });
    }
};

// Delete Individual PAN Card
export const deleteIndividualPanCard = async (req, res) => {
    try {
        const deletedPanCard = await IndividualPanCard.findByIdAndDelete(req.params.id);
        if (!deletedPanCard) {
            return res.status(404).json({ message: "Individual PAN Card not found" });
        }
        res.status(200).json({ message: "Individual PAN Card deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Individual PAN Card", error });
    }
};
