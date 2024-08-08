import mongoose from "mongoose";

const gazetteDOBChange = new mongoose.Schema({
    type: { type: String },
    casteType: { type: String, required: true },
    reasonForChange: { type: String, required: true },
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    oldDOB: { type: String, required: true },
    newDOB: { type: String, required: true },
    documents: {
        aadharCard: {
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
        schoolLC: {
            data: Buffer,
            contentType: String,
        },
        DOBChangeAffidavit: {
            data: Buffer,
            contentType: String,
        }

    }


}, { timestamps: true })

export default mongoose.model('gazetteDOBChange', gazetteDOBChange)