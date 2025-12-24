import React from 'react'
import { Card } from './card'
import { customProps } from './card'

export const CharecterGrid = ()=>{
    return (
        <div className='flex items-center justify-center py-8 px-2 w-full bg-neutral-100  text-center'>
          <h1 className='text-4xl font-medium'>
            Made for <span className='px-px text-4xl bg-linear-to-r text-transparent from-blue-500 to-orange-500 bg-clip-text'>Ambitious</span> <br/> Open Source contributors
          </h1>
            <div className='grid grid-cols-2 gap-4 text-center mt-8'>
              <Card 
              img="../assets/monitor.png"
              title="Monitor Repositories"
              description="Track repository activity and stay updated with real-time notifications on all your important projects"
              />
              <Card 
              img="../asssets/list.png"
              title="List Current Repositories"
              description="Browse and manage all your repositories in one organized view with comprehensive metadata and statistics"
              />
              <Card 
              img="../asssets/analyse.png"
              title="Analyse Issues"
              description="Gain deep insights into issues, bugs, and feature requests to prioritize what matters most for your projects"
              />
              <Card 
              img="../asssets/list.png"
              title="Instantly Attend to Issues"
              description="Respond quickly to pull requests and issues without missing a beat, keeping your team productive"
              />
            </div>
        </div>
    )
}