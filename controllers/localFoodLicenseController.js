import LocalFoodLicense from "../models/localFoodLicense.js";

// Create Local Food License
export const createLocalFoodLicense = async (req, res) => {
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

        const newLicense = new LocalFoodLicense({
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

        res.status(201).json({ message: "Local Food License created successfully", newLicense });
    } catch (error) {
        res.status(500).json({ message: "Error creating Local Food License", error });
    }
};


// Get All Local Food Licenses
export const getAllLocalFoodLicenses = async (req, res) => {
    try {
        const licenses = await LocalFoodLicense.find();
        res.status(200).json(licenses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Local Food Licenses", error });
    }
};



// Get Local Food License by ID
export const getLocalFoodLicenseById = async (req, res) => {
    try {
        const license = await LocalFoodLicense.findById(req.params.id);
        if (!license) {
            return res.status(404).json({ message: "Local Food License not found" });
        }
        res.status(200).json(license);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Local Food License", error });
    }
};

