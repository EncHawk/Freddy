import React from 'react'
import { Card } from './card'
// import { customProps } from './card'
import monitor from '../assets/monitor.png'
import issues from '../assets/issues.png'
import analyse from '../assets/analyse.png'
import list from '../assets/list.png'

export const CharecterGrid = ()=>{
    return (
      <div className='bg-neutral-200 w-full'>
        <div className='isolation-isolate flex flex-col items-center justify-center py-8 px-2 w-full bg-neutral-100  text-center
            mask-b-from-90% mask-b-to-100%
          '>
            <h1 className='text-4xl font-medium mt-20'>
              Made for <span className='px-px text-5xl bg-linear-to-r text-transparent from-blue-600 via-purple-400 50% to-orange-600 bg-clip-text'>Ambitious</span> <br/> Open Source contributors
            </h1>
              <div className='grid grid-cols-2 gap-6 items-center mx-auto text-center mt-8 w-full max-w-7xl '>
                <Card 
                img={monitor}
                title="Monitor Repositories"
                description="Track repository activity and stay updated with real-time notifications on all your important projects"
                />
                <Card 
                img={list}
                title="List Current Repositories"
                description="Browse and manage all your repositories in one organized view with comprehensive metadata and statistics"
                />
                <Card 
                img={analyse}
                title="Analyse Issues"
                description="Gain deep insights into issues, bugs, and feature requests to prioritize what matters most for your projects"
                />
                <Card 
                img={issues}
                title="Instantly Attend to Issues"
                description="Respond quickly to pull requests and issues without missing a beat, keeping your team productive"
                />
              </div>
          </div>
      </div>
       
    )
}