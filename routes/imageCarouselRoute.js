import express from "express";
import formidable from "express-formidable";
import {
    createImageCarousel,
    getAllImageCarousels,
    getImageCarouselById,
    updateImageCarousel,
    deleteImageCarousel
} from "../controllers/imageCarouselController.js";

const router = express.Router();

// Create Image Carousel
router.post("/createImageCarousel", formidable(), createImageCarousel);

// Get All Image Carousels
router.get("/getAllImageCarousels", getAllImageCarousels);

// Get Image Carousel by ID
router.get("/getImageCarousel/:id", getImageCarouselById);

// Update Image Carousel
router.put("/updateImageCarousel/:id", formidable(), updateImageCarousel);

// Delete Image Carousel
router.delete("/deleteImageCarousel/:id", deleteImageCarousel);

export default router;
