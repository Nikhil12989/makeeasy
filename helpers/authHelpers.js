import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const hashpassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcryptjs.compare(password, hashedPassword);
};



// Generate a random OTP
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Send OTP to user's email
export const sendOTPEmail = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // your email address
                pass: process.env.EMAIL_PASSWORD // your email password
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending email:", error);
    }
};