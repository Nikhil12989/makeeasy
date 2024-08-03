import mongoose from "mongoose";

const learningLicenseSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    state: { type: String, },
    rto: { type: String, required: true },
    vehicleType: { type: String, required: true },
    fatherOrHusbandFullName: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date, required: true },
    qualification: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    email: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    address: {
        state: { type: String, },
        district: { type: String, required: true },
        taluka: { type: String, required: true }
    },
    documents: {
        addressProof: {
            data: Buffer,
            contentType: String,

        },
        passportPhoto: {
            data: Buffer,
            contentType: String
        },
        signature: {
            data: Buffer,
            contentType: String
        },
        medicalCertificate: {
            data: Buffer,
            contentType: String
        }
    }
}, { timestamps: true });

export default mongoose.model("LearningLicense", learningLicenseSchema);