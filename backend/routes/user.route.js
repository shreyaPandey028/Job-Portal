import express from "express";
import { getProfile, login, logout, register, updateProfile, getResumeById } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, uploadMultipleFiles } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getProfile);
router.route("/profile/update").post(isAuthenticated,uploadMultipleFiles,updateProfile);
router.get("/resume/*", getResumeById);

export default router;

