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
        <div className='bg-slate-700  flex flex-col justify-center items-center w-full text-white'>
            <p>© 2025 Freddy Oss Bot</p>
            <span>
                Reach out at 
            </span>
            {stuff.map(item=>
                <div className="flex flex-row justify-center items-center ">
                    <a id={item.title} target="_blank" className=' text-xl text-white font-medium hover:text-orange-700' href={item.link}>
                        {item.title}
                    </a>
                </div>
            )}
        </div>
    )
}