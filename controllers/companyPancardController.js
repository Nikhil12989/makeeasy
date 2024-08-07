import CompanyPancard from "../models/companyPancard.js";

// Create Company Pancard
export const createCompanyPancard = async (req, res) => {
    try {
        const {
            companyFullName,
            CompanyNameAsPerPancard,
            gender,
            dateOfBirth,
            companyAddress,
            pincode,
            mobileNumber,
            email,
            companyRegisterNumber,
            ownerFullName
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const signature = req.files.signature ? {
            data: req.files.signature.path,
            contentType: req.files.signature.type
        } : undefined;

        const photo = req.files.photo ? {
            data: req.files.photo.path,
            contentType: req.files.photo.type
        } : undefined;

        const registerCertificate = req.files.registerCertificate ? {
            data: req.files.registerCertificate.path,
            contentType: req.files.registerCertificate.type
        } : undefined;

        const newPancard = new CompanyPancard({
            companyFullName,
            CompanyNameAsPerPancard,
            gender,
            dateOfBirth,
            companyAddress,
            pincode,
            mobileNumber,
            email,
            companyRegisterNumber,
            ownerFullName,
            documents: {
                aadharCard,
                signature,
                photo,
                registerCertificate
            }
        });

        await newPancard.save();

        res.status(201).json({ message: "Company Pancard created successfully", newPancard });
    } catch (error) {
        res.status(500).json({ message: "Error creating Company Pancard", error });
    }
};

// Get All Company Pancards
export const getAllCompanyPancards = async (req, res) => {
    try {
        const pancards = await CompanyPancard.find();
        res.status(200).json(pancards);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Company Pancards", error });
    }
};

// Get Company Pancard by ID
export const getCompanyPancardById = async (req, res) => {
    try {
        const pancard = await CompanyPancard.findById(req.params.id);
        if (!pancard) {
            return res.status(404).json({ message: "Company Pancard not found" });
        }
        res.status(200).json(pancard);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Company Pancard", error });
    }
};

// Update Company Pancard
export const updateCompanyPancard = async (req, res) => {
    try {
        const {
            companyFullName,
            CompanyNameAsPerPancard,
            gender,
            dateOfBirth,
            companyAddress,
            pincode,
            mobileNumber,
            email,
            companyRegisterNumber,
            ownerFullName
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const signature = req.files.signature ? {
            data: req.files.signature.path,
            contentType: req.files.signature.type
        } : undefined;

        const photo = req.files.photo ? {
            data: req.files.photo.path,
            contentType: req.files.photo.type
        } : undefined;

        const registerCertificate = req.files.registerCertificate ? {
            data: req.files.registerCertificate.path,
            contentType: req.files.registerCertificate.type
        } : undefined;

        const updatedPancard = await CompanyPancard.findByIdAndUpdate(
            req.params.id,
            {
                companyFullName,
                CompanyNameAsPerPancard,
                gender,
                dateOfBirth,
                companyAddress,
                pincode,
                mobileNumber,
                email,
                companyRegisterNumber,
                ownerFullName,
                documents: {
                    aadharCard,
                    signature,
                    photo,
                    registerCertificate
                }
            },
            { new: true }
        );

        if (!updatedPancard) {
            return res.status(404).json({ message: "Company Pancard not found" });
        }

        res.status(200).json({ message: "Company Pancard updated successfully", updatedPancard });
    } catch (error) {
        res.status(500).json({ message: "Error updating Company Pancard", error });
    }
};

// Delete Company Pancard
export const deleteCompanyPancard = async (req, res) => {
    try {
        const deletedPancard = await CompanyPancard.findByIdAndDelete(req.params.id);
        if (!deletedPancard) {
            return res.status(404).json({ message: "Company Pancard not found" });
        }
        res.status(200).json({ message: "Company Pancard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Company Pancard", error });
    }
};
