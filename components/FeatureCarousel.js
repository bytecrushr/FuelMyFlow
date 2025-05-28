"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const features = [
    {
      text: "Give your audience an easy way to say thanks.",
      image: "/feature-1.png"
    },
    {
      text: "Start a membership for your biggest fans.",
      image: "/feature-2.png"
    },
    {
      text: "No sign-up needed for supporters",
      image: "/feature-3.png"
    },
    {
      text: "Instant payment notifications",
      image: "/feature-4.png"
    }
  ];

const FeatureCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % features.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % features.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + features.length) % features.length);
    };

    return (
        <div className="flex justify-between items-center py-10 sm:p-10 sm:m-10">
            <button onClick={handlePrev} className="text-lg p-4 rounded-full hover:bg-indigo-950 cursor-pointer transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none">
                    <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="text-center text-white text-lg font-medium mx-10 flex flex-col justify-center items-center gap-3
            transition-all duration-2000">
                <p className='text-xl transition-all duration-500'>{features[index].text}</p>
                <Image
                width={150} 
                height={150} 
                quality={100}
                src={features[index].image} style={{ height: '150px' }} alt={features[index].text} />
                <div className='flex gap-5 py-3'>
                    <div onClick={()=>setIndex(0)} className={` h-3 border border-white cursor-pointer transition-all duration-500 rounded-full ${index===0?"bg-white w-6":"w-3 bg-transparent"}`}></div>
                    <div onClick={()=>setIndex(1)} className={` h-3 border border-white cursor-pointer transition-all duration-500 rounded-full ${index===1?"bg-white w-6":"w-3 bg-transparent"}`}></div>
                    <div onClick={()=>setIndex(2)} className={` h-3 border border-white cursor-pointer transition-all duration-500 rounded-full ${index===2?"bg-white w-6":"w-3 bg-transparent"}`}></div>
                    <div onClick={()=>setIndex(3)} className={` h-3 border border-white cursor-pointer transition-all duration-500 rounded-full ${index===3?"bg-white w-6":"w-3 bg-transparent"}`}></div>
                </div>
            </div>
            <button onClick={handleNext} className="text-lg p-4 rounded-full hover:bg-indigo-950 cursor-pointer transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none">
                    <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default FeatureCarousel;