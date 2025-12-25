import react, { use, useState } from 'react'

interface foo{
    onClose: ()=>void
}

export const Form =({onClose}:foo)=>{
    const [error,setError] = useState(false)
    const[loading,setLoading] = useState(false)
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[err,setErr] = useState('')
    const checkCredentials = async()=>{
        if(!name||!email||!password){
            setErr('All fields must be filled in.')
            setError(true)
            return false
        }
        return true
    }
    const handleSubmit = async(e:React.FormEvent)=>{
        let res
        e.preventDefault()
        setError(false)
        setErr('')
        const isValid = await checkCredentials()
        if(!isValid) return;
        try{
            setLoading(true)
            const url = "http://localhost:8080/api/signin"
            res = await fetch(url,{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify({name,email,password})
                //random to test
            })
            if(!res.ok){
                setError(true)
                setErr('Something went wrong. Please check your information and try again.')
                return
            }
            console.log(res)
            onClose()
        }
        catch(err:any){
            setError(true);
            setErr('Unable to connect. Please check your internet connection and try again.')
        }
        finally{
            setLoading(false)
        }
    }
    return(
       <div className='fixed inset-0 flex justify-center w-full backdrop-blur-md items-center z-50 p-4'>
            <div className='flex flex-col justify-center items-center w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-125 max-h-[90vh] overflow-y-auto'>
                <form id="form" className='py-4 sm:py-6 px-4 sm:px-6 md:px-8 relative flex flex-col gap-3 sm:gap-4 justify-center items-center w-full bg-neutral-100/80 rounded-lg shadow-md' onSubmit={handleSubmit}>
                    <button 
                    className='absolute top-2 right-2 sm:top-3 sm:right-3 text-center py-1 px-1 sm:py-2 sm:px-2
                     text-neutral-600 text-shadow-md hover:text-neutral-500 text-lg sm:text-xl font-bold' 
                    onClick={onClose}>×</button>

                    <span className='text-sm sm:text-base font-medium'>Username</span>
                    <input id="name" autoComplete='off'  
                     onChange={e=>{setName(e.target.value)}}
                    className='bg-transparent focus:backdrop-invert-10 focus:outline-none border
                     border-neutral-500 px-3 py-2 sm:px-4 sm:py-2.5 w-full max-w-xs sm:max-w-sm text-sm sm:text-base' placeholder='John Doe' />

                    <label className='my-0 mx-0 text-sm sm:text-base font-medium'>Email</label>
                    <input id="email" autoComplete='off' 
                    className='bg-transparent my-0 focus:backdrop-invert-10 focus:outline-none border
                     border-neutral-500 px-3 py-2 sm:px-4 sm:py-2.5 w-full max-w-xs sm:max-w-sm text-sm sm:text-base'
                     onChange={e=>{setEmail(e.target.value)}}
                     placeholder='johndoe@gmail.com' />

                    <label className='text-center text-sm sm:text-base font-medium'>Password <br/><span className='text-xs text-red-500 mb-0'>enter valid, functional email id.</span></label>
                    <input autoComplete='off' id="password" type="password"
                     onChange={e=>{setPassword(e.target.value)}}
                    className='bg-transparent my-0 focus:backdrop-invert-10 focus:outline-none border
                     border-neutral-500 px-3 py-2 sm:px-4 sm:py-2.5 w-full max-w-xs sm:max-w-sm text-sm sm:text-base' placeholder='JohndoeIsGenius' />

                    <button type="submit" disabled={loading}
                    className='bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-150 
                    rounded-md text-white text-sm sm:text-base hover:bg-blue-500 shadow-md text-shadow-md w-full max-w-xs sm:max-w-sm' 
                    >
                       {loading?'Signing In...':'Sign In'}
                    
                    </button>
                    {err && <div className='text-red-600 text-xs sm:text-sm mt-2 text-center px-2'>
                            {err}
                        </div>}
                </form>
            </div>
       </div>
    )
}