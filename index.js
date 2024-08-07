import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import Authroutes from "./routes/authRoutes.js"
import LearningLicense from "./routes/learningLicesneRoute.js"
import PermanentLicense from "./routes/permanentLicenseRoute.js"
import RenewalLicense from "./routes/renewalLicenseRoute.js"
import LocalFoodLicense from "./routes/localFoodLicenseRoute.js"
import stateFoodLicense from "./routes/stateFoodLicenseRoute.js"
import centralFoodLicense from "./routes/centralFoodLicenseRoute.js"
import foodManufacturingLicense from "./routes/foodManufacturingLicenseRoute.js"
import imageCarousel from "./routes/imageCarouselRoute.js"
import shopActLicense from "./routes/shopActLicense.js"
import individualPancard from "./routes/individualPancardRoute.js"
import companyPancard from "./routes/companyPancardRoute.js"
import cookieParser from 'cookie-parser';

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL, {
        connectTimeoutMS: 60000, // Increase the timeout to 60 seconds
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });


const app = express()

//middleware 

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

//Api Routes 

app.use("/api/auth", Authroutes)
app.use("/api/learningLicense", LearningLicense)
app.use("/api/permanentLicense", PermanentLicense)
app.use("/api/renewalLicense", RenewalLicense)
app.use("/api/localFoodLicense", LocalFoodLicense)
app.use("/api/stateFoodLicense", stateFoodLicense)
app.use('/api/centralFoodLicense', centralFoodLicense)
app.use('/api/foodManufacturingLicense', foodManufacturingLicense)
app.use('/api/imageCarousel', imageCarousel)
app.use('/api/shopActLicense', shopActLicense)
app.use('/api/individualPancard', individualPancard)
app.use('/api/companyPancard', companyPancard)