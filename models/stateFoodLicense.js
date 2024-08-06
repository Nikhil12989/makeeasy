import mongoose from "mongoose";

const stateFoodLicenseSchema = new mongoose.Schema({
    licenseRequireYears: { type: String, required: true },
    fullName: { type: String, required: true },
    businessName: { type: String, required: true },
    natureOfBusiness: { type: String, required: true },
    ownerQualification: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    businessAddress: { type: String, required: true },
    documents: {
        aadharCard: {
            data: Buffer,
            contentType: String,
        },
        panCard: {
            data: Buffer,
            contentType: String,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        electricBill: {
            data: Buffer,
            contentType: String,
        },
        rentAggrement: {
            data: Buffer,
            contentType: String,
        },
        shopActLicense: {
            data: Buffer,
            contentType: String,
        },
        uddyamAadhar: {
            data: Buffer,
            contentType: String,
        }
    }
}, { timestamps: true });

export default mongoose.model("StateFoodLicense", stateFoodLicenseSchema);
