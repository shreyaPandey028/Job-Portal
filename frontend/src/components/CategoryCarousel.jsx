import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='w-full bg-gradient-to-b from-slate-800 to-slate-900 py-16 px-4 sm:py-20'>
            <div className='max-w-6xl mx-auto relative'>
                <Carousel className="w-full" opts={{ align: "center", loop: true }}>
                    <CarouselContent className='-ml-2 sm:-ml-4'>
                        {
                            category.map((cat, index) => (
                                <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                    <Button 
                                        onClick={()=>searchJobHandler(cat)} 
                                        className="w-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-5 sm:py-6 text-base sm:text-lg transition-all"
                                    >
                                        {cat}
                                    </Button>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-14 border-none text-teal-400 hover:bg-teal-500/20 h-10 w-10 sm:h-12 sm:w-12 bg-slate-700/50 rounded-full transition-all'>
                        <ChevronLeft className='h-5 w-5 sm:h-6 sm:w-6' />
                    </CarouselPrevious>
                    <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-14 border-none text-teal-400 hover:bg-teal-500/20 h-10 w-10 sm:h-12 sm:w-12 bg-slate-700/50 rounded-full transition-all'>
                        <ChevronRight className='h-5 w-5 sm:h-6 sm:w-6' />
                    </CarouselNext>
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel