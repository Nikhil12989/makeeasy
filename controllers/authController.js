import userModel from "../models/userModel.js";
import { comparePassword, hashpassword, generateOTP, sendOTPEmail } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';


// Signup controller
export const signUpController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname) {
            return res.send({ message: "Firstname is required" });
        }
        if (!lastname) {
            return res.send({ message: "Lastname is required" });
        }
        if (!email) {
            return res.send({ message: "Email is required" });
        }
        if (!password) {
            return res.send({ message: "Password is required" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered, please login",
            });
        }

        // Hash the password before saving
        const hashedPassword = await hashpassword(password);

        // Save the new user
        const user = await new userModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

// Sign-in controller
export const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation of user
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password ",
            });
        }

        //Checking User
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is Not Registered",
            });
        }

        //user matching
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        //Token Creation
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Email not registered" });
        }

        // Generate OTP and set expiration time (e.g., 1 hour from now)
        const otp = generateOTP();
        const expirationTime = Date.now() + 3600000; // 1 hour in milliseconds

        // Save OTP and expiration time to the user document
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = expirationTime;
        await user.save();

        // Send OTP to user's email
        await sendOTPEmail(email, otp);

        res.status(200).send({ message: "OTP sent to email" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in forgot password", error });
    }
};


// Verify OTP
export const verifyOTPController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).send({ message: "Email and OTP are required" });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Email not registered" });
        }

        // Check if OTP is correct and not expired
        if (user.resetPasswordOTP !== otp || user.resetPasswordExpires < Date.now()) {
            return res.status(400).send({ message: "Invalid or expired OTP" });
        }

        res.status(200).send({ message: "OTP verified successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in verifying OTP", error });
    }
};

// Reset Password
export const resetPasswordController = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).send({ message: "Email, OTP, and new password are required" });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Email not registered" });
        }

        // Check if OTP is correct and not expired
        if (user.resetPasswordOTP !== otp || user.resetPasswordExpires < Date.now()) {
            return res.status(400).send({ message: "Invalid or expired OTP" });
        }

        // Hash the new password
        const hashedPassword = await hashpassword(newPassword);

        // Update the user's password and clear the OTP fields
        user.password = hashedPassword;
        user.resetPasswordOTP = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in resetting password", error });
    }
};

//Google auth controller
export const google = async (req, res, next) => {
    const { email, name } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            const token = JWT.sign(
                { _id: user._id, role: user.role },
                process.env.JWT_SECRET
            );
            const { password, ...userWithoutPassword } = user.toObject();
            res
                .status(200)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(userWithoutPassword);
        } else {
            let firstname = 'Unknown';
            let lastname = 'Unknown';

            // If name is provided, split it into firstname and lastname
            if (name) {
                let nameParts = name.split(' ');
                firstname = nameParts[0] || 'Unknown';
                lastname = nameParts.slice(1).join(' ') || 'Unknown';
            }

            // Create a new user without a password for Google auth
            const newUser = new userModel({
                firstname,
                lastname,
                email,
                password: 'google-auth-user', // You might want to handle this differently
            });
            await newUser.save();
            const token = JWT.sign(
                { _id: newUser._id, role: newUser.role },
                process.env.JWT_SECRET
            );
            const { password, ...userWithoutPassword } = newUser.toObject();
            res
                .status(200)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(userWithoutPassword);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error in Google authentication", error: error.message });
    }
};
