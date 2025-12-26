import React, { useState, useEffect } from 'react'
import { Card } from './card'

import monitor from '../assets/monitor.png'
import issues from '../assets/issues.png'
import analyse from '../assets/analyse.png'
import list from '../assets/list.png'

import analysedark from '../assets/analysedark.png'
import listdark from '../assets/listdark.png'
import typesdark from '../assets/typesdark.png'
import demodark from '../assets/demo-dark.png'

export const CharecterGrid = ()=>{
  const [isDark, setIsDark] = useState(
      document.documentElement.classList.contains('dark')
    )
  
    useEffect(() => {
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains('dark'))
      })
  
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
  
      return () => observer.disconnect()
    }, [])
  return (
    <div className=' bg-neutral-200 dark:bg-neutral-800 w-full'>
      <div className='isolation-isolate flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-6 md:px-2 w-full dark:bg-neutral-800 bg-neutral-100  text-center
          mask-b-from-95% mask-b-to-100%
        '>
          <h1 className='text-2xl text-black dark:text-white sm:text-3xl md:text-4xl font-medium mt-12 sm:mt-16 md:mt-20 px-2'>
            Made for <span className='px-px text-3xl sm:text-4xl md:text-5xl bg-linear-to-r text-transparent from-blue-600 via-purple-400 50% to-orange-600 bg-clip-text'>Ambitious</span> <br/> Open Source contributors
          </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center mx-auto text-center mt-6 sm:mt-8 w-full max-w-7xl px-2 sm:px-4'>
              <Card 
              img={ isDark? demodark:monitor}
              title="Monitor Repositories"
              description="Track repository activity and stay updated with real-time notifications on all your important projects"
              />
              <Card 
              img={isDark?listdark:list}
              title="List Current Repositories"
              description="Browse and manage all your repositories in one organized view with comprehensive metadata and statistics"
              />
              <Card 
              img={isDark?analysedark:analyse}
              title="Analyse Issues"
              description="Gain deep insights into issues, bugs, and feature requests to prioritize what matters most for your projects"
              />
              <Card 
              img={isDark?typesdark:issues}
              title="Instantly Attend to Issues"
              description="Respond quickly to pull requests and issues without missing a beat, keeping your team productive"
              />
            </div>
        </div>
    </div>
      
  )
}