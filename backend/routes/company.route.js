import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Public routes - anyone can view companies
router.route("/get").get(getCompany);
router.route("/get/:id").get(getCompanyById);

// Protected routes - only authenticated users
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

export default router;

