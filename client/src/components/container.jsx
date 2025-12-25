import React from 'react'
import {twMerge} from 'tailwind-merge'
import clsx from 'clsx'
import '../globals.css'
const cn = (...inputs)=>{
    return twMerge(clsx(inputs))
}

export const Container = ({children})=>{
    return(
        <div className={cn(" relative font-inter w-full max-w-5xl md:max-w-3xl mx-auto py-2 px-2 sm:px-4 md:px-4 md:py-8 ")}>
        {children}
    </div>
    )
}