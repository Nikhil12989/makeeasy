import RenewalLicense from "../models/renewalLicense.js";
import fs from "fs";

// Controller to create a renewal license
export const createRenewalLicense = async (req, res) => {
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
            permanentLicenseNumber,
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

        const adharCard = req.files['documents.adharCard'] ? {
            data: fs.readFileSync(req.files['documents.adharCard'].path),
            contentType: req.files['documents.adharCard'].type
        } : undefined;

        const drivingLicense = req.files['documents.drivingLicense'] ? {
            data: fs.readFileSync(req.files['documents.drivingLicense'].path),
            contentType: req.files['documents.drivingLicense'].type
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

        const newLicense = new RenewalLicense({
            fullName,
            state,
            rto,
            permanentLicenseNumber,
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
                adharCard,
                drivingLicense,
                passportPhoto,
                signature,
                medicalCertificate
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "Renewal License created successfully", newLicense });
    } catch (error) {
        console.error("Error creating Renewal License:", error);
        res.status(500).json({ message: "Error creating Renewal License", error: error.message });
    }
};

// Controller to get a renewal license by ID
export const getRenewalLicense = async (req, res) => {
    try {
        const { id } = req.params;
        const renewalLicense = await RenewalLicense.findById(id);

        if (!renewalLicense) {
            return res.status(404).json({ message: "Renewal License not found" });
        }

        res.status(200).json({ renewalLicense });
    } catch (error) {
        console.error("Error fetching Renewal License:", error);
        res.status(500).json({ message: "Error fetching Renewal License", error: error.message });
    }
};

// Controller to get all renewal licenses
export const getAllRenewalLicenses = async (req, res) => {
    try {
        const renewalLicenses = await RenewalLicense.find();
        res.status(200).json({ renewalLicenses });
    } catch (error) {
        console.error("Error fetching all Renewal Licenses:", error);
        res.status(500).json({ message: "Error fetching all Renewal Licenses", error: error.message });
    }
};
