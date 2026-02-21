import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth);
    
    // Generate server-side resume URL using public_id
    const getServerResumeUrl = (publicId) => {
        if (!publicId) return null;
        return `${USER_API_END_POINT}/resume/${publicId}`;
    };

    const hasResume = Boolean(user?.profile?.resume);

    useEffect(() => {
        const fetchProfileFromDB = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchProfileFromDB();
    }, [dispatch]);

    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar />
            <div className='max-w-5xl mx-auto py-6 px-4 sm:px-6'>
                <div className='bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8'>
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-20 w-20 ring-2 ring-slate-100">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-semibold text-2xl text-slate-900'>{user?.fullname}</h1>
                                <p className='text-slate-600 mt-1'>{user?.profile?.bio || "No bio added yet"}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="w-fit" variant="outline"><Pen className='h-4 w-4 mr-2' />Edit Profile</Button>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6'>
                        <div className='flex items-center gap-3 rounded-lg border border-slate-200 p-3'>
                            <Mail className='h-5 w-5 text-slate-600' />
                            <span className='text-slate-800'>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 rounded-lg border border-slate-200 p-3'>
                            <Contact className='h-5 w-5 text-slate-600' />
                            <span className='text-slate-800'>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div className='my-6'>
                        <h2 className='font-semibold text-slate-900 mb-2'>Skills</h2>
                        <div className='flex flex-wrap items-center gap-2'>
                            {
                                user?.profile?.skills?.length ? user?.profile?.skills.map((item, index) => <Badge key={index} variant="secondary">{item}</Badge>) : <span className='text-slate-500'>NA</span>
                            }
                        </div>
                    </div>

                    <div className='rounded-lg border border-slate-200 p-4'>
                        <Label className="text-base font-semibold text-slate-900">Resume</Label>
                        <div className='mt-2 flex items-center gap-2 text-sm'>
                            <FileText className='h-4 w-4 text-slate-600' />
                            {
                                hasResume ? (
                                    <a target='_blank' rel='noopener noreferrer' href={getServerResumeUrl(user?.profile?.resumePublicId)} className='text-blue-600 hover:underline cursor-pointer'>
                                        {user?.profile?.resumeOriginalName || 'View Resume (PDF)'}
                                    </a>
                                ) : (
                                    <span className='text-slate-500'>No resume uploaded yet</span>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className='mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-6'>
                    <h1 className='font-semibold text-xl text-slate-900 mb-4'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile