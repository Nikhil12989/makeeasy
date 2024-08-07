import mongoose from "mongoose"

const companyRegistrationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    documents: {
        aadharCard: {
            data: Buffer,
            contentType: String,
        },
        pancard: {
            data: Buffer,
            contentType: String,
        },
        electricBill: {
            data: Buffer,
            contentType: String,
        },
        photo: {
            data: Buffer,
            contentType: String,
        }
    }

}, { timestamps: true })

export default mongoose.model("CompanyRegistration", companyRegistrationSchema)