import React from 'react'
import logo from '../assets/logo.svg'
import demo from '../assets/demo.png'
export const Hero = ()=>{
    return(
        <div className='flex flex-col mt-35 mb-15 py-4 px-2 gap-2 justify-center items-center text-black'>
            <h1 className='text-5xl font-md text-center max-w-200 leading-20 tracking-tightest'>
                Meet
                <span className=' mx-2 px-3 relative bg-black/10 font-faulty
                    font-md  decoration-2
                '>FREDDY
                    <span className='bg-red-400 absolute top-[-2px] left-[-1px] rounded-full h-2 w-2'></span>
                    <span className='bg-red-400 absolute top-[-2px] right-[-1px] rounded-full h-2 w-2'></span>
                    <span className='bg-red-400 absolute bottom-[-2px] left-[-1px] rounded-full h-2 w-2'></span>
                    <span className='bg-red-400 absolute bottom-[-2px] right-[-1px] rounded-full h-2 w-2'></span>
                </span>
                the Only Tool You NEED to Contribute to OSS
            </h1>
            <p className='text-center text-neutral-500 font-sm text-xla mb-2 tracking-wide '>
                Get notified when an issue is created. 
                <br/>
                Up your Open Source game today!
            </p>
            <button className='bg-transparent cursor-pointer border border-black hover:bg-orange-100 transition duration-150 py-2 px-6'>
                Sign Up
            </button>
        </div>
    )
}