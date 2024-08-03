import PermanentLicense from "../models/permanentLicense.js";
import fs from "fs";

// Controller to create a permanent license
export const createPermanentLicense = async (req, res) => {
    try {
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
            learningLicenseNumber,
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

        if (!addressDistrict || !addressTaluka) {
            return res.status(400).json({ message: "Address fields are required" });
        }

        const addressProof = req.files['documents.addressProof'] ? {
            data: fs.readFileSync(req.files['documents.addressProof'].path),
            contentType: req.files['documents.addressProof'].type
        } : undefined;

        const learningLicense = req.files['documents.learningLicense'] ? {
            data: fs.readFileSync(req.files['documents.learningLicense'].path),
            contentType: req.files['documents.learningLicense'].type
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

        const newLicense = new PermanentLicense({
            fullName,
            state,
            rto,
            learningLicenseNumber,
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
                learningLicense,
                passportPhoto,
                signature,
                medicalCertificate
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "Permanent License created successfully", newLicense });
    } catch (error) {
        console.error("Error creating Permanent License:", error);
        res.status(500).json({ message: "Error creating Permanent License", error: error.message });
    }
};

// Controller to get a permanent license by ID
export const getPermanentLicense = async (req, res) => {
    try {
        const { id } = req.params;
        const permanentLicense = await PermanentLicense.findById(id);

        if (!permanentLicense) {
            return res.status(404).json({ message: "Permanent License not found" });
        }

        res.status(200).json({ permanentLicense });
    } catch (error) {
        console.error("Error fetching Permanent License:", error);
        res.status(500).json({ message: "Error fetching Permanent License", error: error.message });
    }
};

// Controller to get all permanent licenses
export const getAllPermanentLicenses = async (req, res) => {
    try {
        const permanentLicenses = await PermanentLicense.find();
        res.status(200).json({ permanentLicenses });
    } catch (error) {
        console.error("Error fetching all Permanent Licenses:", error);
        res.status(500).json({ message: "Error fetching all Permanent Licenses", error: error.message });
    }
};
