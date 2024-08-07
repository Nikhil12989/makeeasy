import mongoose from "mongoose"

const individualPanCard = new mongoose.Schema({
    fullName: { type: String, required: true },
    nameAsPerPancard: { type: String, required: true },
    fatherFullName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    adharNumber: { type: String, required: true },
    nameAsPerAadhar: { type: String, required: true },
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

    }

}, { timestamps: true })

export default mongoose.model('IndividualPancard', individualPanCard)