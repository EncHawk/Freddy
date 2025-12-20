import { useState } from 'react'
import './globals.css'
import { Navbar } from './components/navbar'
import {Container} from './components/container'
import { Hero } from './components/hero'

function App() {
  return (
      <div className='flex relative flex-col min-h-screen items-center bg-linear-to-b 
      from-neutral-200 to-indigo-200
      '
      >
        <div className='max-w-5xl w-full h-full absolute inset-0 mx-auto pointer-events-none'>
          <div id="vertical-line" className='absolute inset-y-0 left-0 h-100% w-[0.5px] 
            bg-linear-to-b from-transparent via-neutral-600/40 to-transparent 
          '></div>
          <div id="vertical-line" className='absolute inset-y-0 right-0 h-100% w-[0.5px] 
            bg-linear-to-b from-transparent-40% via-neutral-600/40 to-transparent-60%
          '></div>
        </div>
        <Container>
          <Navbar/>
          <Hero/>
        </Container>
      </div>
  )
}

export default App
