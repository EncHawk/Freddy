import React from "react";
import { Command } from "./command";
// for each component:
// name it, what it does and then the future
//  changes.

export const Documentation = ()=>{
   return(
     <div className="w-full bg-neutral-300">
        <div className="flex flex-col justify-center items-center gap-10 px-px py-20 w-full bg-neutral-100 mask-b-from-80% mask-b-to-100%">
            <h1 className="text-3xl font-medium text-transparent bg-linear-to-r from-blue-600 via-purple-400 50% to-orange-600 bg-clip-text tracking-tight">
                Documentation
            </h1>
            <div className="grid grid-cols-2 gap-5">
                <Command title="Monitor"  command="/monitor" isBeta={false} content="Inititiates a session based storage system where the github repository url sent gets stored."/>
                <Command title="List" command="/list" isBeta={false}  content="Provides a list of all the repositories that are being monitored, does not require an input whatsoever."/>
                <Command title="Remove" command="/remove" isBeta={false} content="Removes any repository that is being monitored from the list, input required: repository name."/>
                <Command title="Analyse" command="/analyse" isBeta={true} content="Makes an Api call to Github servers, retrieves the issues further processed by LLM's for a response."/>
            </div>
        
        </div>
     </div>
   )
}