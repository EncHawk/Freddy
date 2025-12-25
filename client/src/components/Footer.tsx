import react from 'react'

export const Footer = ()=>{
    const stuff  = [
        {
            title:"Github",
            link : "https://github.com/EncHawk/Freddy"
        },
        {
            title:"X",
            link:"https://x.com/d_leap07"
        },
        {
            title:"LinkedIn",
            link:"https://www.linkedin.com/in/dilip-kumar-750a70227/"
        }
    ]
    return (
        <div className='bg-slate-700 gap-6 sm:gap-8 md:gap-10 flex flex-col justify-center items-center w-full text-white py-6 sm:py-8 md:py-10 px-4'>
            <p className='text-xs sm:text-sm'>© 2025 Freddy Oss Bot</p>
            <span className='text-sm sm:text-base md:text-md'>
                Reach out at 
            </span>
            <div className="flex flex-row gap-6 sm:gap-8 md:gap-10 justify-center items-center flex-wrap">
            {stuff.map(item=>
                <a id={item.title} target="_blank" className=' text-base sm:text-lg md:text-xl text-white font-medium hover:text-orange-700 transition-colors' href={item.link}>
                    {item.title}
                </a>
            )}
            </div>
        </div>
    )
}