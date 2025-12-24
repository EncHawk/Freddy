import * as React from "react";

export interface customProps{
    img:string,
    title:string,
    description:string
}

export const Card = ({title,description,img}:customProps)=>{
    return(
        <div className=" group text-center flex flex-col shadow-md max-w-md  mx-auto py-4 px-2 rounded-lg
        bg-neutral-100 hover:bg-blue-100/50 hover:border-[0.5px] border-neutral-500 transition-all duration-150 cursor-pointer
        items-center justify-center overflow-hidden">
            <img src={img}  className="w-full h-40 md:h-80  transition-all duration:200 group-hover:scale-105 object-cover object-top-left"/>
            <h1 className="text-3xl text-black tracking-wide mt-5">
                {title}
            </h1>
            <h3 className=" text-xs tracking-tight max-w-xs text-neutral-500">
                {description}
            </h3>
        </div>
    )
}