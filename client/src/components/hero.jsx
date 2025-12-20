import React from 'react'

export const Hero = ()=>{
    return(
        <div className='flex flex-col my-35 py-4 px-2 gap-2 justify-center items-center text-black'>
            <h1 className='text-5xl font-md text-center max-w-200 leading-20 tracking-tightest'>
                Meet
                <span className=' mx-2 px-3 rounded-lg relative bg-black/10
                    font-md  decoration-2
                '>FREDDY
                    <span className='bg-red-400 absolute top-0 left-0 rounded-full h-3 w-3'></span>
                    <span className='bg-red-400 absolute top-0 right-0 rounded-full h-3 w-3'></span>
                    <span className='bg-red-400 absolute bottom-0 left-0 rounded-full h-3 w-3'></span>
                    <span className='bg-red-400 absolute bottom-0 right-0 rounded-full h-3 w-3'></span>
                </span>
                the Only Tool You NEED to Contribute to OSS
            </h1>
            <p className='text-center text-neutral-500 font-sm text-xl mb-2 tracking-wide '>
                Get notified when an issue is created. 
                <br/>
                Up your Open Source game today!
            </p>
            <button className='bg-transparent backdrop-blur-2xl cursor-pointer border border-black hover:bg-primary transition duration-150 py-2 px-6'>
                Sign Up
            </button>
        </div>
    )
}