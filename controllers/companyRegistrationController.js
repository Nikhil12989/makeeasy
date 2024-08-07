import CompanyRegistration from "../models/companyRegistration.js";

// Create Company Registration
export const createCompanyRegistration = async (req, res) => {
    try {
        const {
            fullName,
            companyName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const pancard = req.files.pancard ? {
            data: req.files.pancard.path,
            contentType: req.files.pancard.type
        } : undefined;

        const electricBill = req.files.electricBill ? {
            data: req.files.electricBill.path,
            contentType: req.files.electricBill.type
        } : undefined;

        const photo = req.files.photo ? {
            data: req.files.photo.path,
            contentType: req.files.photo.type
        } : undefined;

        const newRegistration = new CompanyRegistration({
            fullName,
            companyName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth,
            documents: {
                aadharCard,
                pancard,
                electricBill,
                photo
            }
        });

        await newRegistration.save();

        res.status(201).json({ message: "Company Registration created successfully", newRegistration });
    } catch (error) {
        res.status(500).json({ message: "Error creating Company Registration", error });
    }
};

// Get All Company Registrations
export const getAllCompanyRegistrations = async (req, res) => {
    try {
        const registrations = await CompanyRegistration.find();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Company Registrations", error });
    }
};

// Get Company Registration by ID
export const getCompanyRegistrationById = async (req, res) => {
    try {
        const registration = await CompanyRegistration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: "Company Registration not found" });
        }
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Company Registration", error });
    }
};

// Update Company Registration
export const updateCompanyRegistration = async (req, res) => {
    try {
        const {
            fullName,
            companyName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const pancard = req.files.pancard ? {
            data: req.files.pancard.path,
            contentType: req.files.pancard.type
        } : undefined;

        const electricBill = req.files.electricBill ? {
            data: req.files.electricBill.path,
            contentType: req.files.electricBill.type
        } : undefined;

        const photo = req.files.photo ? {
            data: req.files.photo.path,
            contentType: req.files.photo.type
        } : undefined;

        const updatedRegistration = await CompanyRegistration.findByIdAndUpdate(
            req.params.id,
            {
                fullName,
                companyName,
                email,
                address,
                pincode,
                mobileNumber,
                dateOfBirth,
                documents: {
                    aadharCard,
                    pancard,
                    electricBill,
                    photo
                }
            },
            { new: true }
        );

        if (!updatedRegistration) {
            return res.status(404).json({ message: "Company Registration not found" });
        }

        res.status(200).json({ message: "Company Registration updated successfully", updatedRegistration });
    } catch (error) {
        res.status(500).json({ message: "Error updating Company Registration", error });
    }
};

// Delete Company Registration
export const deleteCompanyRegistration = async (req, res) => {
    try {
        const deletedRegistration = await CompanyRegistration.findByIdAndDelete(req.params.id);
        if (!deletedRegistration) {
            return res.status(404).json({ message: "Company Registration not found" });
        }
        res.status(200).json({ message: "Company Registration deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Company Registration", error });
    }
};
