import * as React from "react";

export interface customProps{
    img:string,
    title:string,
    description:string
}

export const Card = ({title,description,img}:customProps)=>{
    return(
        <div className=" group text-center flex flex-col shadow-md max-w-md w-full mx-auto py-3 sm:py-4 px-2 sm:px-3 md:px-2 rounded-lg
        bg-neutral-100 hover:bg-blue-100/50 hover:border-[0.5px] border-neutral-500 transition-all duration-150 cursor-pointer
        items-center justify-center overflow-hidden">
            <div className="w-full overflow-hidden">
                <img src={img}  className="w-full h-32 sm:h-40 md:h-60 lg:h-80 transition-all duration:500 group-hover:scale-105 object-cover object-top-left"/>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl text-black tracking-wide mt-3 sm:mt-4 md:mt-5 px-2">
                {title}
            </h1>
            <h3 className=" text-xs sm:text-sm tracking-tight max-w-xs text-neutral-500 px-2 pb-2">
                {description}
            </h3>
        </div>
    )
}