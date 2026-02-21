import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useState } from 'react'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const syncUserFromDB = async () => {
            try {
                if (!user) return;
                const res = await axios.get(`${USER_API_END_POINT}/profile`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        };

        syncUserFromDB();
    }, [dispatch, user?._id]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    }
    return (
        <div className='bg-gradient-to-r from-slate-900 to-slate-800 border-b border-teal-500/30'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold text-white'>Job<span className='text-teal-400'>Portal</span></h1>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 text-slate-300'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='hover:text-teal-400 transition-colors'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-teal-400 transition-colors'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-teal-400 transition-colors'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-teal-400 transition-colors'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-teal-400 transition-colors'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className='border-slate-500 text-slate-300 hover:bg-slate-700'>Login</Button></Link>
                                <Link to="/signup"><Button className="bg-teal-600 hover:bg-teal-700">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-slate-800 border-teal-500/30">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium text-white'>{user?.fullname}</h4>
                                                <p className='text-sm text-slate-400'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer text-white hover:text-teal-400 transition-colors'>
                                                        <User2 className='h-4 w-4' />
                                                        <Button variant="link" className='p-0 h-auto text-white hover:text-teal-400'> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer text-white hover:text-red-400 transition-colors'>
                                                <LogOut className='h-4 w-4' />
                                                <Button onClick={logoutHandler} variant="link" className='p-0 h-auto text-white hover:text-red-400'>Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className='md:hidden text-white'
                >
                    {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden bg-slate-800 border-t border-teal-500/30 px-4 py-4'>
                    <ul className='flex flex-col gap-4 text-slate-300 mb-4'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='hover:text-teal-400 transition-colors'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-teal-400 transition-colors'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-teal-400 transition-colors'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-teal-400 transition-colors'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-teal-400 transition-colors'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {!user && (
                        <div className='flex flex-col gap-2'>
                            <Link to="/login"><Button variant="outline" className='w-full border-slate-500 text-slate-300 hover:bg-slate-700'>Login</Button></Link>
                            <Link to="/signup"><Button className="w-full bg-teal-600 hover:bg-teal-700">Signup</Button></Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navbar