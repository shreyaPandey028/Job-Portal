import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This forces Node to look one level up from /utils into the /backend folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log("Checking API_KEY:", process.env.API_KEY); // Should show the number now

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default cloudinary;