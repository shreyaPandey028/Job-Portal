import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, deleteJob } from "../controllers/job.controller.js";

const router = express.Router();

// Public routes - anyone can view jobs
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);

// Protected routes - only authenticated users
router.route("/post").post(isAuthenticated, postJob);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

export default router;

