import react from 'react'

interface command{
    title:string,
    command:string,
    content:string,
    isBeta:boolean
}
export const Command = (props:command)=>{
     return (
     <div className=" flex flex-col justify-center items-center col-span-1 max-w-100 cursor-pointer">
            <div className=" relative bg-neutral-200/50  px-2 py-2 rounded-md flex flex-col justify-start">
                {props.isBeta? 
                <span className='w-2 h-2 absolute top-2 right-2 bg-yellow-500 animate-pulse rounded-lg'></span>
                : 
                <span className='w-2 h-2 absolute top-2 right-2 bg-green-500 animate-pulse rounded-lg'></span>
                }
                <h1 className="text-xl text-black font-md ">
                    {props.title}
                </h1>
                <i className="text-red-400 text-sm font-sm">{props.command}</i>
                <p className='tracking-tight  font-light'>
                    {props.content}
                </p>
            </div>  
        </div>
    )
}