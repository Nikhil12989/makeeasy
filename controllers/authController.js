import userModel from "../models/userModel.js";
import { comparePassword, hashpassword, } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config()

// Debug statements
// console.log('Email:', process.env.EMAIL);
// console.log('Password:', process.env.PASSWORD);
// console.log('Notification Email:', process.env.NOTIFICATION_EMAIL);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service provider
    auth: {
        user: process.env.EMAIL, // Your email id
        pass: process.env.PASSWORD // Your email password or app-specific password
    }
});


// Send email function
const sendEmail = (toEmail, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Email sent to:', toEmail); // Log the recipient email
    });
};


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

        // Validation of user
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password ",
            });
        }

        // Checking User
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is Not Registered",
            });
        }

        // User matching
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // Token Creation
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });


        // Send email notification
        // Send email notification to the user who logged in
        sendEmail(email, 'Login Notification', `You have successfully logged in with email: ${email} password:${password}`);


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