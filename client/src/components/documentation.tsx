import React from "react";
import { Command } from "./command";
// for each component:
// name it, what it does and then the future
//  changes.

export const Documentation = ()=>{
   return(
     <div id="documentation" className="w-full bg-neutral-300">
        <div className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-px py-12 sm:py-16 md:py-20 w-full bg-neutral-100 mask-b-from-80% mask-b-to-100%">
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-medium text-transparent bg-linear-to-r from-blue-600 via-purple-400 50% to-orange-600 bg-clip-text tracking-tight">
                Documentation
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-7xl px-2 sm:px-4">
                <Command title="Monitor"  command="/monitor" isBeta={false} content="Inititiates a session based storage system where the github repository url sent gets stored."/>
                <Command title="List" command="/list" isBeta={false}  content="Provides a list of all the repositories that are being monitored, does not require an input whatsoever."/>
                <Command title="Remove" command="/remove" isBeta={false} content="Removes any repository that is being monitored from the list, input required: repository name."/>
                <Command title="Analyse" command="/analyse" isBeta={true} content="Makes an Api call to Github servers, retrieves the issues further processed by LLM's for a response."/>
            </div>
        
        </div>
     </div>
   )
}