import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setAllAdminJobs } from '@/redux/jobSlice'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])

    const handleDelete = async (jobId) => {
        if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
            return;
        }

        try {
            setLoading(true);
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                withCredentials: true
            });
            
            if (res.data.success) {
                toast.success(res.data.message || "Job deleted successfully");
                // Update Redux state - remove deleted job from admin jobs
                const updatedAdminJobs = allAdminJobs.filter(job => job._id !== jobId);
                dispatch(setAllAdminJobs(updatedAdminJobs));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to delete job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent  posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    No jobs posted yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt?.split("T")?.[0] || "N/A"}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                            <div 
                                                onClick={()=> handleDelete(job._id)} 
                                                className='flex items-center gap-2 w-fit cursor-pointer mt-2'
                                            >
                                                <Trash2 className='w-4 text-red-600' />
                                                <span className='text-red-600'>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>

                        ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable