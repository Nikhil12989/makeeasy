import ImageCarousel from "../models/imageCarousel.js";

// Create Image Carousel
export const createImageCarousel = async (req, res) => {
    try {
        const images = req.files.images.map(file => ({
            data: file.path,
            contentType: file.type
        }));

        const newCarousel = new ImageCarousel({ images });
        await newCarousel.save();

        res.status(201).json({ message: "Image Carousel created successfully", newCarousel });
    } catch (error) {
        res.status(500).json({ message: "Error creating Image Carousel", error });
    }
};

// Get All Image Carousels
export const getAllImageCarousels = async (req, res) => {
    try {
        const carousels = await ImageCarousel.find();
        res.status(200).json(carousels);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Image Carousels", error });
    }
};

// Get Image Carousel by ID
export const getImageCarouselById = async (req, res) => {
    try {
        const carousel = await ImageCarousel.findById(req.params.id);
        if (!carousel) {
            return res.status(404).json({ message: "Image Carousel not found" });
        }
        res.status(200).json(carousel);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Image Carousel", error });
    }
};

// Update Image Carousel
export const updateImageCarousel = async (req, res) => {
    try {
        const images = req.files.images.map(file => ({
            data: file.path,
            contentType: file.type
        }));

        const updatedCarousel = await ImageCarousel.findByIdAndUpdate(
            req.params.id,
            { images },
            { new: true }
        );

        if (!updatedCarousel) {
            return res.status(404).json({ message: "Image Carousel not found" });
        }

        res.status(200).json({ message: "Image Carousel updated successfully", updatedCarousel });
    } catch (error) {
        res.status(500).json({ message: "Error updating Image Carousel", error });
    }
};

// Delete Image Carousel
export const deleteImageCarousel = async (req, res) => {
    try {
        const deletedCarousel = await ImageCarousel.findByIdAndDelete(req.params.id);
        if (!deletedCarousel) {
            return res.status(404).json({ message: "Image Carousel not found" });
        }

        res.status(200).json({ message: "Image Carousel deleted successfully", deletedCarousel });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Image Carousel", error });
    }
};
