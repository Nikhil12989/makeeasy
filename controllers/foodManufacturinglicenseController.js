import FoodManufacturingLicense from "../models/foodManufacturingLicense.js";

// Create Food Manufacturing License
export const createFoodManufacturingLicense = async (req, res) => {
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

        const newLicense = new FoodManufacturingLicense({
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
                rentAggrement
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "Food Manufacturing License created successfully", newLicense });
    } catch (error) {
        res.status(500).json({ message: "Error creating Food Manufacturing License", error });
    }
};


// Get All Food Manufacturing Licenses
export const getAllFoodManufacturingLicenses = async (req, res) => {
    try {
        const licenses = await FoodManufacturingLicense.find();
        res.status(200).json(licenses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Food Manufacturing Licenses", error });
    }
};


// Get Food Manufacturing License by ID
export const getFoodManufacturingLicenseById = async (req, res) => {
    try {
        const license = await FoodManufacturingLicense.findById(req.params.id);
        if (!license) {
            return res.status(404).json({ message: "Food Manufacturing License not found" });
        }
        res.status(200).json(license);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Food Manufacturing License", error });
    }
};
