import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import https from "https";

export const getProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching profile",
            success: false
        });
    }
}

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating account",
            success: false
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        const isProduction = process.env.NODE_ENV === "production";
        const cookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        };

        return res.status(200).cookie("token", token, cookieOptions).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error logging in",
            success: false
        })
    }
}
export const getResumeById = async (req, res) => {
    try {
        // Extract the path after /resume/
        let publicId = req.params[0];
        
        // Remove any leading slashes from the publicId
        publicId = publicId?.replace(/^\/+/, '');
        
        if (!publicId) {
            return res.status(400).json({
                message: "Resume ID is required",
                success: false
            });
        }

        console.log("Fetching resume with publicId:", publicId);

        // Verify resource exists in Cloudinary
        const resourceInfo = await cloudinary.api.resource(publicId, {
            resource_type: "raw"
        });

        if (!resourceInfo) {
            return res.status(404).json({
                message: "Resume not found",
                success: false
            });
        }

        // Generate the secure Cloudinary URL
        const resumeUrl = cloudinary.url(publicId, {
            resource_type: "raw",
            secure: true,
            type: "upload"
        });

        console.log("Generated Cloudinary URL:", resumeUrl);

        // Set headers for inline PDF display (not download)
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=resume.pdf");
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Fetch PDF from Cloudinary and stream it
        return new Promise((resolve, reject) => {
            https.get(resumeUrl, { timeout: 10000 }, (response) => {
                if (response.statusCode !== 200) {
                    res.status(response.statusCode).json({
                        message: "Error fetching resume from Cloudinary",
                        success: false
                    });
                    return;
                }
                response.pipe(res);
                resolve();
            }).on('error', (error) => {
                console.error("Error streaming PDF:", error);
                if (!res.headersSent) {
                    res.status(500).json({
                        message: "Error fetching resume from Cloudinary",
                        success: false,
                        error: error.message
                    });
                }
                reject(error);
            });
        });

    } catch (error) {
        console.log("Resume fetch error:", error);
        if (!res.headersSent) {
            return res.status(500).json({
                message: "Error fetching resume",
                success: false,
                error: error.message
            });
        }
    }
}

export const logout = async (req, res) => {

    try {
        const isProduction = process.env.NODE_ENV === "production";
        return res.status(200).cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error logging out",
            success: false
        })
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const files = req.files; // Now using .fields() instead of .single()
        let skillsArray;

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        
        // Handle profile photo upload
        if(files?.profilePhoto && files.profilePhoto[0]) {
            const profilePhotoFile = files.profilePhoto[0];
            const fileUri = getDataUri(profilePhotoFile);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "jobportal/profile-photos"
            });
            user.profile.profilePhoto = cloudResponse.secure_url;
            user.profile.profilePhotoPublicId = cloudResponse.public_id;
        }

        // Handle resume/file upload
        if(files?.file && files.file[0]) {
            const resumeFile = files.file[0];
            const fileUri = getDataUri(resumeFile);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",
                folder: "jobportal/resumes"
            });
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumePublicId = cloudResponse.public_id;
            user.profile.resumeOriginalName = resumeFile.originalname;
        }

        if(skills){
            skillsArray = skills.split(",");
        }
        
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Error updating profile",
            success:false
        })
    }
}