import * as React from "react";

export interface customProps{
    img:string,
    title:string,
    description:string
}

export const Card = ({title,description}:customProps)=>{
    return(
        <div className="text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl text-black">
                {title}
            </h1>
            <h3 className="max-w-sm">
                {description}
            </h3>
            <p className="text-md text-neutral-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsam mollitia ad id non, quaerat, error, in fuga eum debitis dolor numquam itaque nemo voluptates. Facere necessitatibus odit at quis.
            </p>
        </div>
    )
}