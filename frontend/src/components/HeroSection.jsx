import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <>
            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translate(0, 0px); }
                    50% { transform: translate(-30px, -30px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0, 0px); }
                    50% { transform: translate(30px, 30px); }
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-border {
                    0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
                }
                @keyframes glow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                .animate-float1 { animation: float1 8s ease-in-out infinite; }
                .animate-float2 { animation: float2 10s ease-in-out infinite; }
                .animate-fadeInDown { animation: fadeInDown 0.8s ease-out; }
                .animate-fadeInUp { animation: fadeInUp 0.8s ease-out 0.3s both; }
                .animate-pulse-border { animation: pulse-border 3s ease-in-out infinite; }
                .animate-glow { animation: glow 4s ease-in-out infinite; }
            `}</style>
            <div className='relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'>
                {/* Animated background elements */}
                <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                    <div className='absolute top-20 right-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float1'></div>
                    <div className='absolute bottom-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float2'></div>
                </div>

                {/* Content */}
                <div className='relative z-10 flex flex-col items-center justify-center mx-auto max-w-7xl'>
                    {/* Badge */}
                    <div className='mb-8 animate-fadeInDown'>
                        <span className='inline-block px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/50 text-sm font-medium text-teal-300 animate-glow'>
                            No. 1 Job Hunt Website
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-white mb-6 leading-tight animate-fadeInDown' style={{animationDelay: '0.1s'}}>
                        Search, Apply & <br /> Get Your{' '}
                        <span className='bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent'>Dream Jobs</span>
                    </h1>

                    {/* Subtitle */}
                    <p className='text-base sm:text-lg text-slate-300 text-center mb-12 max-w-2xl animate-fadeInDown' style={{animationDelay: '0.2s'}}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                    </p>

                    {/* Search Bar */}
                    <div className='w-full max-w-md sm:max-w-xl animate-fadeInUp'>
                        <div className='flex h-12 sm:h-13 shadow-lg rounded-lg overflow-hidden border border-slate-600 animate-pulse-border hover:border-teal-500/80 transition-all'>
                            <input
                                type="text"
                                placeholder='Find your dream jobs'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className='flex-1 px-4 sm:px-6 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all border-none'
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="px-5 sm:px-6 h-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white flex items-center justify-center transition-all rounded-none p-0 hover:shadow-lg hover:shadow-teal-500/50"
                            >
                                <Search className='h-5 w-5' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection