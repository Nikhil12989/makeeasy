import mongoose from "mongoose";

const imageCarouselSchema = new mongoose.Schema({
    images: [
        {
            data: Buffer,
            contentType: String
        }
    ]
}, { timestamps: true });

export default mongoose.model("ImageCarousel", imageCarouselSchema);
