import {React,useEffect,useState} from 'react'
import logo from '../assets/logo.svg'
import demo from '../assets/demo.png'
import {Form} from './form'

export const Hero = ()=>{
    const[login,setLogin] = useState(false)
    useEffect(()=>{
        if(login){
            document.body.classList.add('.no-scroll')
        }
        else{
            document.body.classList.remove('.no-scroll')
        }
        return(()=>{
            document.body.classList.remove('no-scroll')
        })
    },[login])
    return(
        <div className='flex flex-col mt-20 sm:mt-28 md:mt-35 mb-8 sm:mb-12 md:mb-15 py-4 px-4 sm:px-6 md:px-2 gap-2 sm:gap-3 justify-center items-center text-black'>
             <div className='bg-linear-to-r from-sky-400  to-transparent py-px px-2 rounded-full text-black 
             text-xs font-inter transition-all duration-300font-medium md:font-semibold cursor-pointer
             md:py-2 md:px-2
             bg-size-200% bg-left hover:bg-right border-[0.5px] border-neutral-400 shadow-sm
             hover:bg-linear-to-r hover:from-blue-400  hover:to-orange-400 hover:text-sky-100 hover:text-shadow-md'> 
                Get Ahead of the pack for GSOC'26!
            </div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-md text-center max-w-[95%] sm:max-w-3xl md:max-w-200 leading-tight sm:leading-20 tracking-tightest px-2'>
                Meet
                <span className=' mx-1 sm:mx-2 px-2 sm:px-3 relative bg-black/10 font-faulty
                    font-md  decoration-2 inline-block
                '>FREDDY
                    <span className='bg-red-400 absolute top-[-2px] left-[-1px] rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2'></span>
                    <span className='bg-red-400 absolute top-[-2px] right-[-1px] rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2'></span>
                    <span className='bg-red-400 absolute bottom-[-2px] left-[-1px] rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2'></span>
                    <span className='bg-red-400 absolute bottom-[-2px] right-[-1px] rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2'></span>
                </span>
                <span className='block sm:inline'> the Only Tool You NEED to Contribute to OSS</span>
            </h1>
            <p className='text-center text-neutral-500 font-sm text-sm sm:text-base md:text-xla mb-2 sm:mb-3 tracking-wide max-w-[90%] sm:max-w-2xl px-2'>
                Get notified when an issue is created. 
                <br className='hidden sm:block'/>
                <span className='block sm:inline'>Up your Open Source game today!</span>
            </p>
            <button onClick={()=>{setLogin(true)}} className='bg-transparent cursor-pointer border border-black hover:bg-orange-100 transition duration-150 py-2 px-4 sm:py-2 sm:px-6 text-sm sm:text-base'>
                Sign Up
            </button>
            <span className='text-black text-xs bg-neutral-300 px-2 py-1 rounded-lg mt-2 text-center'> check email if logged in.</span>
            {login && <Form onClose={()=>{setLogin(false)}}/>}
        </div>
    )
}