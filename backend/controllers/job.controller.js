import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        }

        const experienceNumber = Number(experience);
        const positionNumber = Number(position);

        if (Number.isNaN(experienceNumber) || Number.isNaN(positionNumber)) {
            return res.status(400).json({
                message: "Experience and position must be valid numbers.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: `${requirements}`.split(",").map((item) => item.trim()).filter(Boolean),
            salary: salary.trim(),
            location,
            jobType,
            experienceLevel: experienceNumber,
            position: positionNumber,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating job",
            success: false
        })
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching jobs",
            success: false
        })
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching job",
            success: false
        })
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .populate({
                path: "company"
            })
            .sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching admin jobs",
            success: false
        })
    }
}

// update job by admin
export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const jobId = req.params.id;
        const userId = req.id;

        // Check if job exists and belongs to the user
        const job = await Job.findOne({ _id: jobId, created_by: userId });
        if (!job) {
            return res.status(404).json({
                message: "Job not found or you don't have permission to edit it.",
                success: false
            });
        }

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const experienceNumber = Number(experience);
        const positionNumber = Number(position);

        if (Number.isNaN(experienceNumber) || Number.isNaN(positionNumber)) {
            return res.status(400).json({
                message: "Experience and position must be valid numbers.",
                success: false
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {
                title,
                description,
                requirements: `${requirements}`.split(",").map((item) => item.trim()).filter(Boolean),
                salary: salary.trim(),
                location,
                jobType,
                experienceLevel: experienceNumber,
                position: positionNumber,
                company: companyId
            },
            { new: true }
        ).populate({ path: "company" });

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating job",
            success: false
        });
    }
}
