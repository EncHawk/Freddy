import {React,useEffect,useState} from "react"; 
import '../globals.css'
import logo from '../assets/logo.svg'
export const Navbar = ()=>{
    const [scrolled,setScrolled] = useState(false)

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
        className={`fixed top-4 left-1/2 -translate-x-1/2
             flex items-center justify-between mx-auto py-2 px-2 rounded-full w-full max-w-4xl z-10
            ${scrolled
                ?"backdrop-blur-lg border-[0.5px] border-neutral-500/20 inset-shadow-sm"
                :"bg-transparent "
            }
        `}>
            <h1 className={`group relative text-blue-500 text-2xl font-inter px-2 transition-all duration-200 cursor-pointer hover:text-blue-400 z-10
                `}>
                Freddy
                <span className=" absolute left-0 bottom-0 h-0.5 w-0.5
                bg-transparent
                transition-all duration-200
                z-[-1]
                group-hover:w-full group-hover:bg-linear-to-r from-transparent-30% via-orange-600 to-transparent-70% group-hover:rounded-sm"></span>
            </h1>
            <button className=" rounded-full bg-orange-700 hover:bg-slate-500 text-primary hover:text-white transition duration-150 py-2 px-4 
                cursor-pointer shadow-sm text-shadow-md
            ">
                Get Started
            </button>
        </div>
    )
}