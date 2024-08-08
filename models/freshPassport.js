import mongoose from "mongoose"

const freshPassport = new mongoose.Schema({
    typeOfApplication: { type: String, required: true },
    typeOfPassport: { type: String, required: true },
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    aadharNumber: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    fatherFullName: { type: String, required: true },
    motherFullName: { type: String, required: true },
    spouseFullName: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String },
    policeStation: { type: String, required: true },
    educationQualification: { type: String, required: true },
    emergencyContactFullName: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    emergencyContactAddress: { type: String, required: true },
    documents: {
        aadharCard: {
            data: Buffer,
            contentType: String,

        },
        panCard: {
            data: Buffer,
            contentType: String,

        },
    }


}, { timestamps: true })

export default mongoose.model('freshPassport ', freshPassport)