import { useState,useEffect } from 'react'
import './globals.css'
import { Navbar } from './components/navbar'
import {Container} from './components/container'
import { Hero } from './components/hero'
import{CharecterGrid} from './components/contentGrid'
import{Documentation} from './components/documentation'
import { Footer } from './components/Footer'
import lightdemo from './assets/demo-light.png'
import darkdemo from './assets/demo-dark.png'

function App() {
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
      <div className='flex relative flex-col min-h-screen items-center bg-linear-to-b 
      from-neutral-100 to-blue-300/90
      dark:bg-linear-to-b dark:from-neutral-800 dark:to-black/70
      '>
        <Container>
          <div className='max-w-5xl w-full h-full absolute inset-0 mx-auto pointer-events-none hidden md:block'>
            <div id="vertical-line" className='absolute inset-y-0 left-0 h-100% w-[0.5px] 
              bg-linear-to-b from-transparent via-neutral-600/40 to-transparent 
              dark:bg-linear-to-b dark:from-transparent dark:via-neutral-400/40 dark:to-transparent
            '></div>
            <div id="vertical-line" className='absolute inset-y-0 right-0 h-100% w-[0.5px] 
              bg-linear-to-b from-transparent-40% via-neutral-600/40 to-transparent-60%
              dark:bg-linear-to-b dark:from-transparent dark:via-neutral-400/40 dark:to-transparent
            '></div>
          </div>
          <Navbar/>
          <Hero/>
        </Container>
        <div className="bg-neutral-200 dark:bg-neutral-800 rounded-lg p-0.5 sm:p-1 max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full mask-b-from-50% mask-b-to-100% mx-2 sm:mx-4">
          
          <img className="rounded-lg w-full h-auto" src={isDark? darkdemo: lightdemo} alt="Demo"/>
        </div>
        <CharecterGrid/>
        <Documentation/>
        <Footer/>
      </div>
  )
}

export default App
