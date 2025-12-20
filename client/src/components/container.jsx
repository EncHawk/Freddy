import React from 'react'
import {twMerge} from 'tailwind-merge'
import clsx from 'clsx'
import '../globals.css'
const cn = (...inputs)=>{
    return twMerge(clsx(inputs))
}

export const Container = ({children})=>{
    return(
        <div className={cn("font-inter w-full max-w-5xl mx-auto py-2 px-4 md:py-8")}>
        {children}
    </div>
    )
}