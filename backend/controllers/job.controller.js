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

        const salaryNumber = Number(salary);
        const experienceNumber = Number(experience);
        const positionNumber = Number(position);

        if (Number.isNaN(salaryNumber) || Number.isNaN(experienceNumber) || Number.isNaN(positionNumber)) {
            return res.status(400).json({
                message: "Salary, experience, and position must be valid numbers.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: `${requirements}`.split(",").map((item) => item.trim()).filter(Boolean),
            salary: salaryNumber,
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

// Update job - only creator can update
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            });
        }

        const salaryNumber = Number(salary);
        const experienceNumber = Number(experience);
        const positionNumber = Number(position);

        if (Number.isNaN(salaryNumber) || Number.isNaN(experienceNumber) || Number.isNaN(positionNumber)) {
            return res.status(400).json({
                message: "Salary, experience, and position must be valid numbers.",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this job.",
                success: false
            });
        }

        job.title = title;
        job.description = description;
        job.requirements = `${requirements}`.split(",").map((item) => item.trim()).filter(Boolean);
        job.salary = salaryNumber;
        job.location = location;
        job.jobType = jobType;
        job.experienceLevel = experienceNumber;
        job.position = positionNumber;
        job.company = companyId;

        await job.save();

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
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

// Delete job - only creator can delete
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Check ownership
        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this job.",
                success: false
            });
        }

        await Job.findByIdAndDelete(jobId);
        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error deleting job",
            success: false
        });
    }
}
