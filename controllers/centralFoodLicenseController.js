import CentralFoodLicense from "../models/centralFoodLicense.js";

// Create Central Food License
export const createCentralFoodLicense = async (req, res) => {
    try {
        const {
            licenseRequireYears,
            fullName,
            businessName,
            natureOfBusiness,
            ownerQualification,
            email,
            mobileNumber,
            businessAddress
        } = req.fields;

        const aadharCard = req.files.aadharCard ? {
            data: req.files.aadharCard.path,
            contentType: req.files.aadharCard.type
        } : undefined;

        const panCard = req.files.panCard ? {
            data: req.files.panCard.path,
            contentType: req.files.panCard.type
        } : undefined;

        const photo = req.files.photo ? {
            data: req.files.photo.path,
            contentType: req.files.photo.type
        } : undefined;

        const electricBill = req.files.electricBill ? {
            data: req.files.electricBill.path,
            contentType: req.files.electricBill.type
        } : undefined;

        const rentAggrement = req.files.rentAggrement ? {
            data: req.files.rentAggrement.path,
            contentType: req.files.rentAggrement.type
        } : undefined;

        const shopActLicense = req.files.shopActLicense ? {
            data: req.files.shopActLicense.path,
            contentType: req.files.shopActLicense.type
        } : undefined;

        const uddyamAadhar = req.files.uddyamAadhar ? {
            data: req.files.uddyamAadhar.path,
            contentType: req.files.uddyamAadhar.type
        } : undefined;

        const newLicense = new CentralFoodLicense({
            licenseRequireYears,
            fullName,
            businessName,
            natureOfBusiness,
            ownerQualification,
            email,
            mobileNumber,
            businessAddress,
            documents: {
                aadharCard,
                panCard,
                photo,
                electricBill,
                rentAggrement,
                shopActLicense,
                uddyamAadhar
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "Central Food License created successfully", newLicense });
    } catch (error) {
        res.status(500).json({ message: "Error creating Central Food License", error });
    }
};


// Get All Central Food Licenses
export const getAllCentralFoodLicenses = async (req, res) => {
    try {
        const licenses = await CentralFoodLicense.find();
        res.status(200).json(licenses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Central Food Licenses", error });
    }
};


// Get Central Food License by ID
export const getCentralFoodLicenseById = async (req, res) => {
    try {
        const license = await CentralFoodLicense.findById(req.params.id);
        if (!license) {
            return res.status(404).json({ message: "Central Food License not found" });
        }
        res.status(200).json(license);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Central Food License", error });
    }
};
