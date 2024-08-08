import mongoose from "mongoose"

const gstRegistration = new mongoose.Schema({
    businessFullName: { type: String, required: true },
    ownerFullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    panNumber: { type: String, required: true },
    email: { type: String, required: true },
    businessStartDate: { type: String, required: true },
    natureOfBusiness: { type: String, required: true },
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
        signature: {
            data: Buffer,
            contentType: String,
        },
        electricityBill: {
            data: Buffer,
            contentType: String,
        },
        shopActLicense: {
            data: Buffer,
            contentType: String,
        },
        rentAggreement: {
            data: Buffer,
            contentType: String,
        }
    }
}, { timestamps: true })

export default mongoose.model('gstRegistration', gstRegistration)