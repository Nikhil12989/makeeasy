import LearningLicense from "../models/learningLicense.js";
import fs from "fs";

export const createLearningLicense = async (req, res) => {
    try {
        // Trim spaces from keys
        const trimmedFields = {};
        for (const key in req.fields) {
            if (req.fields.hasOwnProperty(key)) {
                trimmedFields[key.trim()] = req.fields[key];
            }
        }

        const {
            fullName,
            state,
            rto,
            vehicleType,
            fatherOrHusbandFullName,
            gender,
            dateOfBirth,
            qualification,
            bloodGroup,
            email,
            emergencyContact,
            'address.state': addressState,
            'address.district': addressDistrict,
            'address.taluka': addressTaluka
        } = trimmedFields;

        // Validate address object
        if (!addressState || !addressDistrict || !addressTaluka) {
            return res.status(400).json({ message: "Address fields are required" });
        }

        // Convert files to buffers if they exist
        const addressProof = req.files['documents.addressProof'] ? {
            data: fs.readFileSync(req.files['documents.addressProof'].path),
            contentType: req.files['documents.addressProof'].type
        } : undefined;

        const passportPhoto = req.files['documents.passportPhoto'] ? {
            data: fs.readFileSync(req.files['documents.passportPhoto'].path),
            contentType: req.files['documents.passportPhoto'].type
        } : undefined;

        const signature = req.files['documents.signature'] ? {
            data: fs.readFileSync(req.files['documents.signature'].path),
            contentType: req.files['documents.signature'].type
        } : undefined;

        const medicalCertificate = req.files['documents.medicalCertificate'] ? {
            data: fs.readFileSync(req.files['documents.medicalCertificate'].path),
            contentType: req.files['documents.medicalCertificate'].type
        } : undefined;

        const newLicense = new LearningLicense({
            fullName,
            state,
            rto,
            vehicleType,
            fatherOrHusbandFullName,
            gender,
            dateOfBirth,
            qualification,
            bloodGroup,
            email,
            emergencyContact,
            address: {
                state: addressState,
                district: addressDistrict,
                taluka: addressTaluka
            },
            documents: {
                addressProof,
                passportPhoto,
                signature,
                medicalCertificate
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "Learning License created successfully", newLicense });
    } catch (error) {
        console.error("Error creating Learning License:", error);
        res.status(500).json({ message: "Error creating Learning License", error: error.message });
    }
};


// Controller to get all learning licenses

export const getAllLearningLicenses = async (req, res) => {
    try {
        const learningLicenses = await LearningLicense.find();
        res.status(200).json({ learningLicenses });
    } catch (error) {
        console.error("Error fetching all Learning Licenses:", error);
        res.status(500).json({ message: "Error fetching all Learning Licenses", error: error.message });
    }
};

// Controller to get a learning license by ID
export const getLearningLicense = async (req, res) => {
    try {
        const { id } = req.params;
        const learningLicense = await LearningLicense.findById(id);

        if (!learningLicense) {
            return res.status(404).json({ message: "Learning License not found" });
        }

        res.status(200).json({ learningLicense });
    } catch (error) {
        console.error("Error fetching Learning License:", error);
        res.status(500).json({ message: "Error fetching Learning License", error: error.message });
    }
}