import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

const app = express();
app.set("trust proxy", 1);

// ============ PERMANENT CORS CONFIGURATION ============
const VERCEL_FRONTEND = "https://job-portal-jzxzl0iwz-priyanshu-tiwaris-projects-e02b1965.vercel.app";

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:5174", 
            "http://localhost:5175",
            "http://localhost:5176",
            VERCEL_FRONTEND,
            process.env.FRONTEND_URL || VERCEL_FRONTEND
        ];
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }
        
        // Check if origin is in whitelist
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`❌ CORS BLOCKED - Origin not allowed: ${origin}`);
            callback(null, true); // Allow temporarily for testing, change to error in production
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
};

// ============ MIDDLEWARES ============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// OPTIONS handler for preflight requests
app.options("*", cors(corsOptions));

console.log("✅ CORS Enabled for Frontend:", corsOptions.origin.toString().substring(0, 100));

const PORT = process.env.PORT || 3000;

// ============ API ROUTES ============
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})