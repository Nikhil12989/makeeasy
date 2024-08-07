import ShopActLicense from "../models/shopActLicense.js";

// Create Shop Act License
export const createShopActLicense = async (req, res) => {
    try {
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
        } = req.fields;

        const passportPhoto = req.files.passportPhoto ? {
            data: req.files.passportPhoto.path,
            contentType: req.files.passportPhoto.type
        } : undefined;

        const signature = req.files.signature ? {
            data: req.files.signature.path,
            contentType: req.files.signature.type
        } : undefined;

        const aadharProof = req.files.aadharProof ? {
            data: req.files.aadharProof.path,
            contentType: req.files.aadharProof.type
        } : undefined;

        const pancard = req.files.pancard ? {
            data: req.files.pancard.path,
            contentType: req.files.pancard.type
        } : undefined;

        const shopPhoto = req.files.shopPhoto ? {
            data: req.files.shopPhoto.path,
            contentType: req.files.shopPhoto.type
        } : undefined;

        const selfDeclaration = req.files.selfDeclaration ? {
            data: req.files.selfDeclaration.path,
            contentType: req.files.selfDeclaration.type
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
        res.status(500).json({ message: "Error creating Shop Act License", error });
    }
};

// Get All Shop Act Licenses
export const getAllShopActLicenses = async (req, res) => {
    try {
        const licenses = await ShopActLicense.find();
        res.status(200).json(licenses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Shop Act Licenses", error });
    }
};

// Get Shop Act License by ID
export const getShopActLicenseById = async (req, res) => {
    try {
        const license = await ShopActLicense.findById(req.params.id);
        if (!license) {
            return res.status(404).json({ message: "Shop Act License not found" });
        }
        res.status(200).json(license);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Shop Act License", error });
    }
};

// Update Shop Act License
export const updateShopActLicense = async (req, res) => {
    try {
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
        } = req.fields;

        const passportPhoto = req.files.passportPhoto ? {
            data: req.files.passportPhoto.path,
            contentType: req.files.passportPhoto.type
        } : undefined;

        const signature = req.files.signature ? {
            data: req.files.signature.path,
            contentType: req.files.signature.type
        } : undefined;

        const aadharProof = req.files.aadharProof ? {
            data: req.files.aadharProof.path,
            contentType: req.files.aadharProof.type
        } : undefined;

        const pancard = req.files.pancard ? {
            data: req.files.pancard.path,
            contentType: req.files.pancard.type
        } : undefined;

        const shopPhoto = req.files.shopPhoto ? {
            data: req.files.shopPhoto.path,
            contentType: req.files.shopPhoto.type
        } : undefined;

        const selfDeclaration = req.files.selfDeclaration ? {
            data: req.files.selfDeclaration.path,
            contentType: req.files.selfDeclaration.type
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
        res.status(500).json({ message: "Error updating Shop Act License", error });
    }
};

// Delete Shop Act License
export const deleteShopActLicense = async (req, res) => {
    try {
        const deletedLicense = await ShopActLicense.findByIdAndDelete(req.params.id);
        if (!deletedLicense) {
            return res.status(404).json({ message: "Shop Act License not found" });
        }
        res.status(200).json({ message: "Shop Act License deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Shop Act License", error });
    }
};
