import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-teal-500/30 cursor-pointer hover:border-teal-500 hover:shadow-teal-500/20 transition-all'>
            <div>
                <h1 className='font-medium text-lg text-white'>{job?.company?.name}</h1>
                <p className='text-sm text-slate-400'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 text-teal-300'>{job?.title}</h1>
                <p className='text-sm text-slate-300'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className='bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'>{job?.position} Positions</Badge>
                <Badge className='bg-teal-500/20 text-teal-300 border border-teal-500/50 font-bold'>{job?.jobType}</Badge>
                <Badge className='bg-violet-500/20 text-violet-300 border border-violet-500/50 font-bold'>{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards