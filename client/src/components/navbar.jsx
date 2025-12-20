import React from "react"; 
import '../globals.css'

export const Navbar = ()=>{
    return (
        <div className="flex items-center justify-between mx-auto backdrop-blur-3xl py-2 px-4 rounded-full  w-full max-w-4xl 
            border-2 border-neutral-300/30 ring-1 ring-neutral-400/40 shadow inset-shadow-lg 
        ">
            <h1 className=" relative text-xl px-2 py-2 text-black transition-all duration-200 cursor-pointer group hover:text-white">
                Freddy
                <span className=" absolute rounded-sm bg-transparent left-0 bottom-0 h-0.5 w-full transition-all duration-200 z-[-1] group-hover:h-full group-hover:bg-orange-700"></span>
            </h1>
            <button className=" rounded-full bg-orange-700 hover:bg-slate-500 text-primary hover:text-white transition duration-150 py-2 px-4 
                cursor-pointer shadow-sm text-shadow-md
            ">
                Get Started
            </button>
        </div>
    )
}