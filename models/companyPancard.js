import mongoose from "mongoose"

const comapanyPanardSchema = new mongoose.Schema({
    companyFullName: { type: String, required: true },
    CompanyNameAsPerPancard: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    companyAddress: { type: String, required: true },
    pincode: { type: Number, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    companyRegisterNumber: { type: String, required: true },
    ownerFullName: { type: String, required: true },
    documents: {
        aadharCard: {
            data: Buffer,
            contentType: String,
        },
        signature: {
            data: Buffer,
            contentType: String
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        registerCertificate: {
            data: Buffer,
            contentType: String
        }
    }



}, { timestamps: true })

export default mongoose.model("CompanyPancard", comapanyPanardSchema)