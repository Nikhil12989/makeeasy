import mongoose from "mongoose"

const itrFilling = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    mobileNumber: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    documents: {
        panCard: {
            data: Buffer,
            contentType: String,
        },
    }
}, { timestamps: true })

export default mongoose.model('itrFiling', itrFilling)