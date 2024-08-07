import mongoose from "mongoose";

const shopActLicenseSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    fullNameMarathi: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    addressEnglish: { type: String, required: true },
    addressMarathi: { type: String, required: true },
    noofYearsInResidency: { type: String, required: true },
    shopName: { type: String, required: true },
    shopNameMarathi: { type: String, required: true },
    natureOfBusiness: { type: String, required: true },
    natureOfBusinessMarathi: { type: String, required: true },
    shopAddress: { type: String, required: true },
    shopAddressMarathi: { type: String, required: true },
    shopPincode: { type: Number, required: true },
    isShopRented: { type: String, required: true, enum: ['Yes', 'No'] },
    businessStartDate: { type: Date, required: true },
    noOfMaleEmployess: { type: Number, required: true },
    noOfFemaleEmployess: { type: Number, required: true },
    partnerFullName: { type: String },
    partnerNumber: { type: String },
    partnerFullEmail: { type: String },
    partnerFullAddress: { type: String },
    aadharNumber: { type: String, required: true },
    documents: {
        passportPhoto: {
            data: Buffer,
            contentType: String
        },
        signature: {
            data: Buffer,
            contentType: String
        },
        aadharProof: {
            data: Buffer,
            contentType: String,
        },
        pancard: {
            data: Buffer,
            contentType: String,
        },
        shopPhoto: {
            data: Buffer,
            contentType: String
        },
        selfDeclaration: {
            data: Buffer,
            contentType: String,
        }
    }
}, { timestamps: true });

export default mongoose.model("ShopActLicense", shopActLicenseSchema);
