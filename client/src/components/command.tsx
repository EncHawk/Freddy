import react from 'react'

interface command{
    title:string,
    command:string,
    content:string,
    isBeta:boolean
}
export const Command = (props:command)=>{
     return (
     <div className=" flex flex-col justify-center items-center col-span-1 max-w-full w-full cursor-pointer">
            <div className=" relative dark:bg-neutral-400/50 bg-neutral-200/50  px-3 sm:px-4 md:px-2
             py-2 sm:py-2 md:py-px rounded-md flex flex-col justify-start w-full md:max-h-20 lg:max-h-25">
                {props.isBeta? 
                <span className='w-2 h-2 absolute top-2 right-2 bg-yellow-500 animate-pulse rounded-lg'></span>
                : 
                <span className='w-2 h-2 absolute top-2 right-2 bg-green-500 animate-pulse rounded-lg'></span>
                }
                <h1 className="relative text-lg sm:text-xl md:text-xl dark:text-white text-black font-m">
                    {props.title}
                    {props.isBeta && <span className='absolute mt-[0.5px] border-[0.5px] border-neutral-600 bg-neutral-300 text-neutral-500 px-1.5 sm:px-2 py-0 rounded-md top-0 left-16 sm:left-18 text-[8px] sm:text-[9px]'>BETA</span>}
                </h1>
                <i className="text-red-400 dark:text-green-500 text-xs sm:text-sm font-sm">{props.command}</i>
                <p className=' font-light text-xs sm:text-sm dark:text-white tracking-tighter'>
                    {props.content}
                </p>
            </div>  
        </div>
    )
}