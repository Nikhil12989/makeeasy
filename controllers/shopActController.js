import ShopActLicense from "../models/shopActLicense.js";
import fs from "fs";

// Create Shop Act License
export const createShopActLicense = async (req, res) => {
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
            fullNameMarathi,
            mobileNumber,
            email,
            gender,
            dateOfBirth,
            addressEnglish,
            addressMarathi,
            noofYearsInResidency,
            shopName,
            shopNameMarathi,
            natureOfBusiness,
            natureOfBusinessMarathi,
            shopAddress,
            shopAddressMarathi,
            shopPincode,
            isShopRented,
            businessStartDate,
            noOfMaleEmployess,
            noOfFemaleEmployess,
            partnerFullName,
            partnerNumber,
            partnerFullEmail,
            partnerFullAddress,
            aadharNumber
        } = trimmedFields;

        // Convert files to buffers if they exist
        const passportPhoto = req.files['documents.passportPhoto'] ? {
            data: fs.readFileSync(req.files['documents.passportPhoto'].path),
            contentType: req.files['documents.passportPhoto'].type
        } : undefined;

        const signature = req.files['documents.signature'] ? {
            data: fs.readFileSync(req.files['documents.signature'].path),
            contentType: req.files['documents.signature'].type
        } : undefined;

        const aadharProof = req.files['documents.aadharProof'] ? {
            data: fs.readFileSync(req.files['documents.aadharProof'].path),
            contentType: req.files['documents.aadharProof'].type
        } : undefined;

        const pancard = req.files['documents.pancard'] ? {
            data: fs.readFileSync(req.files['documents.pancard'].path),
            contentType: req.files['documents.pancard'].type
        } : undefined;

        const shopPhoto = req.files['documents.shopPhoto'] ? {
            data: fs.readFileSync(req.files['documents.shopPhoto'].path),
            contentType: req.files['documents.shopPhoto'].type
        } : undefined;

        const selfDeclaration = req.files['documents.selfDeclaration'] ? {
            data: fs.readFileSync(req.files['documents.selfDeclaration'].path),
            contentType: req.files['documents.selfDeclaration'].type
        } : undefined;

        const newLicense = new ShopActLicense({
            fullName,
            fullNameMarathi,
            mobileNumber,
            email,
            gender,
            dateOfBirth,
            addressEnglish,
            addressMarathi,
            noofYearsInResidency,
            shopName,
            shopNameMarathi,
            natureOfBusiness,
            natureOfBusinessMarathi,
            shopAddress,
            shopAddressMarathi,
            shopPincode,
            isShopRented,
            businessStartDate,
            noOfMaleEmployess,
            noOfFemaleEmployess,
            partnerFullName,
            partnerNumber,
            partnerFullEmail,
            partnerFullAddress,
            aadharNumber,
            documents: {
                passportPhoto,
                signature,
                aadharProof,
                pancard,
                shopPhoto,
                selfDeclaration
            }
        });

        await newLicense.save();

        res.status(201).json({ message: "Shop Act License created successfully", newLicense });
    } catch (error) {
        console.error("Error creating Shop Act License:", error);
        res.status(500).json({ message: "Error creating Shop Act License", error: error.message });
    }
};

// Get All Shop Act Licenses
export const getAllShopActLicenses = async (req, res) => {
    try {
        const licenses = await ShopActLicense.find();
        res.status(200).json({ licenses });
    } catch (error) {
        console.error("Error retrieving Shop Act Licenses:", error);
        res.status(500).json({ message: "Error retrieving Shop Act Licenses", error: error.message });
    }
};

// Get Shop Act License by ID
export const getShopActLicenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const license = await ShopActLicense.findById(id);

        if (!license) {
            return res.status(404).json({ message: "Shop Act License not found" });
        }

        res.status(200).json({ license });
    } catch (error) {
        console.error("Error retrieving Shop Act License:", error);
        res.status(500).json({ message: "Error retrieving Shop Act License", error: error.message });
    }
};

// Update Shop Act License
export const updateShopActLicense = async (req, res) => {
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
            fullNameMarathi,
            mobileNumber,
            email,
            gender,
            dateOfBirth,
            addressEnglish,
            addressMarathi,
            noofYearsInResidency,
            shopName,
            shopNameMarathi,
            natureOfBusiness,
            natureOfBusinessMarathi,
            shopAddress,
            shopAddressMarathi,
            shopPincode,
            isShopRented,
            businessStartDate,
            noOfMaleEmployess,
            noOfFemaleEmployess,
            partnerFullName,
            partnerNumber,
            partnerFullEmail,
            partnerFullAddress,
            aadharNumber
        } = trimmedFields;

        // Convert files to buffers if they exist
        const passportPhoto = req.files['documents.passportPhoto'] ? {
            data: fs.readFileSync(req.files['documents.passportPhoto'].path),
            contentType: req.files['documents.passportPhoto'].type
        } : undefined;

        const signature = req.files['documents.signature'] ? {
            data: fs.readFileSync(req.files['documents.signature'].path),
            contentType: req.files['documents.signature'].type
        } : undefined;

        const aadharProof = req.files['documents.aadharProof'] ? {
            data: fs.readFileSync(req.files['documents.aadharProof'].path),
            contentType: req.files['documents.aadharProof'].type
        } : undefined;

        const pancard = req.files['documents.pancard'] ? {
            data: fs.readFileSync(req.files['documents.pancard'].path),
            contentType: req.files['documents.pancard'].type
        } : undefined;

        const shopPhoto = req.files['documents.shopPhoto'] ? {
            data: fs.readFileSync(req.files['documents.shopPhoto'].path),
            contentType: req.files['documents.shopPhoto'].type
        } : undefined;

        const selfDeclaration = req.files['documents.selfDeclaration'] ? {
            data: fs.readFileSync(req.files['documents.selfDeclaration'].path),
            contentType: req.files['documents.selfDeclaration'].type
        } : undefined;

        const updatedLicense = await ShopActLicense.findByIdAndUpdate(
            req.params.id,
            {
                fullName,
                fullNameMarathi,
                mobileNumber,
                email,
                gender,
                dateOfBirth,
                addressEnglish,
                addressMarathi,
                noofYearsInResidency,
                shopName,
                shopNameMarathi,
                natureOfBusiness,
                natureOfBusinessMarathi,
                shopAddress,
                shopAddressMarathi,
                shopPincode,
                isShopRented,
                businessStartDate,
                noOfMaleEmployess,
                noOfFemaleEmployess,
                partnerFullName,
                partnerNumber,
                partnerFullEmail,
                partnerFullAddress,
                aadharNumber,
                documents: {
                    passportPhoto,
                    signature,
                    aadharProof,
                    pancard,
                    shopPhoto,
                    selfDeclaration
                }
            },
            { new: true }
        );

        if (!updatedLicense) {
            return res.status(404).json({ message: "Shop Act License not found" });
        }

        res.status(200).json({ message: "Shop Act License updated successfully", updatedLicense });
    } catch (error) {
        console.error("Error updating Shop Act License:", error);
        res.status(500).json({ message: "Error updating Shop Act License", error: error.message });
    }
};

// Delete Shop Act License
export const deleteShopActLicense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLicense = await ShopActLicense.findByIdAndDelete(id);

        if (!deletedLicense) {
            return res.status(404).json({ message: "Shop Act License not found" });
        }

        res.status(200).json({ message: "Shop Act License deleted successfully" });
    } catch (error) {
        console.error("Error deleting Shop Act License:", error);
        res.status(500).json({ message: "Error deleting Shop Act License", error: error.message });
    }
};
