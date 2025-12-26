import {React,useEffect,useState} from "react"; 
import '../globals.css'
import {Sun,Moon} from 'lucide-react'

export const Navbar = ()=>{
    const [scrolled,setScrolled] = useState(false)
        const [isDark,setDark] = useState(false)

    const handleThemeChange=()=>{
        setDark(!isDark)
        const currTheme = document.documentElement.classList.contains('dark')
        ?'light':'dark'
        document.documentElement.classList.toggle('dark')
        localStorage.setItem('TailwindTheme',currTheme)
    }
    useEffect(()=>{
        const onscroll = ()=>{
            setScrolled(window.scrollY>50)
        }
        window.addEventListener('scroll',onscroll)
        return ()=>window.removeEventListener('scroll',onscroll)
    },[])
    return (
        <div 
            id = "navbar"
        className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2
             flex items-center justify-between mx-auto py-1.5 sm:py-2 px-2 sm:px-4 rounded-full w-[95%] sm:w-full
             max-w-[95%] sm:max-w-2xl lg:max-w-3xl z-10
            ${scrolled
                ?"backdrop-blur-lg border-[0.5px] border-neutral-500/20 dark:border-neutral-400/20 inset-shadow-sm"
                :"bg-transparent "
            }
        `}>
            <h1 className={`group relative text-blue-500 text-lg sm:text-xl md:text-2xl font-inter px-1 sm:px-2 transition-all duration-200 cursor-pointer hover:text-blue-400 z-10
                `}>
                Freddy
                <span className=" absolute left-0 bottom-0 h-0.5 w-0.5
                bg-transparent
                transition-all duration-200
                z-[-1]
                group-hover:w-full group-hover:bg-linear-to-r from-transparent-30% via-orange-600 to-transparent-70% group-hover:rounded-sm"></span>
            </h1>
            <div className="flex items-center gap-4">
                <button onClick='#documentation'  className=" rounded-full bg-orange-700 hover:bg-blue-500
                dark:bg-zinc-500 dark:hover:orange-700 text-neutral-200
                hover:text-white transition duration-150 py-1.5 px-3 sm:py-2 sm:px-4 
                cursor-pointer shadow-sm text-shadow-md scroll-smooth text-xs sm:text-sm md:text-base
                ">
                    <a href="#documentation" className="unset-all">
                        Get Started
                    </a>
                </button>
                <button onClick={handleThemeChange} className="bg-transparent text-sm py-2 px-2 dark:text-white text-black">
                    {isDark?<Sun/>:<Moon/>}
                </button>
            </div>
        </div>
    )
}