import ItrFiling from "../models/itrFiling.js";
import fs from "fs";

// Create ITR Filing
export const createItrFiling = async (req, res) => {
    try {
        const {
            fullName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth
        } = req.fields;

        const panCard = req.files.panCard ? {
            data: fs.readFileSync(req.files.panCard.path),
            contentType: req.files.panCard.type
        } : undefined;

        const newItrFiling = new ItrFiling({
            fullName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth,
            documents: {
                panCard
            }
        });

        await newItrFiling.save();

        res.status(201).json({ message: "ITR Filing created successfully", newItrFiling });
    } catch (error) {
        console.error("Error creating ITR Filing:", error);
        res.status(500).json({ message: "Error creating ITR Filing", error: error.message });
    }
};

// Get All ITR Filings
export const getAllItrFilings = async (req, res) => {
    try {
        const itrFilings = await ItrFiling.find();
        res.status(200).json({ itrFilings });
    } catch (error) {
        console.error("Error retrieving ITR Filings:", error);
        res.status(500).json({ message: "Error retrieving ITR Filings", error: error.message });
    }
};

// Get ITR Filing by ID
export const getItrFilingById = async (req, res) => {
    try {
        const { id } = req.params;
        const itrFiling = await ItrFiling.findById(id);

        if (!itrFiling) {
            return res.status(404).json({ message: "ITR Filing not found" });
        }

        res.status(200).json({ itrFiling });
    } catch (error) {
        console.error("Error retrieving ITR Filing:", error);
        res.status(500).json({ message: "Error retrieving ITR Filing", error: error.message });
    }
};

// Update ITR Filing
export const updateItrFiling = async (req, res) => {
    try {
        const {
            fullName,
            email,
            address,
            pincode,
            mobileNumber,
            dateOfBirth
        } = req.fields;

        const panCard = req.files.panCard ? {
            data: fs.readFileSync(req.files.panCard.path),
            contentType: req.files.panCard.type
        } : undefined;

        const updatedItrFiling = await ItrFiling.findByIdAndUpdate(
            req.params.id,
            {
                fullName,
                email,
                address,
                pincode,
                mobileNumber,
                dateOfBirth,
                documents: {
                    panCard
                }
            },
            { new: true }
        );

        if (!updatedItrFiling) {
            return res.status(404).json({ message: "ITR Filing not found" });
        }

        res.status(200).json({ message: "ITR Filing updated successfully", updatedItrFiling });
    } catch (error) {
        console.error("Error updating ITR Filing:", error);
        res.status(500).json({ message: "Error updating ITR Filing", error: error.message });
    }
};

// Delete ITR Filing
export const deleteItrFiling = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItrFiling = await ItrFiling.findByIdAndDelete(id);

        if (!deletedItrFiling) {
            return res.status(404).json({ message: "ITR Filing not found" });
        }

        res.status(200).json({ message: "ITR Filing deleted successfully" });
    } catch (error) {
        console.error("Error deleting ITR Filing:", error);
        res.status(500).json({ message: "Error deleting ITR Filing", error: error.message });
    }
};
