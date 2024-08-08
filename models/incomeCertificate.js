import mongoose from "mongoose";

const incomeCertificate = new mongoose.Schema({
    fullNameEnglish: { type: String, required: true },
    fullNameMarathi: { type: String, required: true },
    fatherFullNameEnglish: { type: String, required: true },
    fatherFullNameMarathi: { type: String, required: true },
    incomeCertificate: { type: String, enum: ['1 Year', '3 Year'] },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    mobileNumber: { type: Number, required: true },
    service: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    sourceOfIncome: { type: String, required: true },
    purposeOfIncomeCertificate: { type: String, required: true },
    documents: {
        rationCard: {
            type: Buffer,
            contentType: String,
        },
        aadharCard: {
            type: Buffer,
            contentType: String,
        },
        photoIdentity: {
            type: Buffer,
            contentType: String,
        },
        signature: {
            type: Buffer,
            contentType: String,
        },
        talithiIncome: {
            type: Buffer,
            contentType: String,
        }
    }

}, { timestamps: true })

export default mongoose.model('incomeCertificate', incomeCertificate)