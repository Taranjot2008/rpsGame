import cloud from '../assets/cloud.svg'
import { useEffect, useState } from 'react'

export default function Header() {

    const [darkState, setDarkState] = useState(false)

    useEffect(() => {
        const htmlElement = document.documentElement
        if (darkState) {
            htmlElement.classList.add('dark')
        }
        else {
            htmlElement.classList.remove('dark')
        }
    }, [darkState])


    return (
        <header className="header flex flex-col items-center">
            <div className="cloud-container flex justify-center items-center mt-[11px]">
                <img src={cloud} alt="" className='cloud-img z-0 max-sm:w-[320px]'/>
                <h1 className="cloud-heading absolute z-5 w-1/3 font-(family-name:--heading)
                text-center text-6xl text-(--heading-color) max-sm:text-3xl max-sm:w-2/3">
                    Rock, Paper & Scissors
                </h1>
            </div>

            <p className="subheading text-white text-md font-medium mt-4 max-sm:text-[12px]
            max-sm:w-3/4 text-center">
                Never played rock, paper & scissors?  ....YOU CAN NOW!
            </p>

            <div className="theme-switcher absolute top-6 left-5 text-3xl flex gap-4
            max-sm:top-2 max-sm:left-2">
                {darkState ? <span className='w-10 h-10 p-4 rounded-full bg-white flex items-center justify-center
                max-sm:text-xl max-sm:w-6 max-sm:h-6'>
                    <i className="fa-solid fa-moon hover:cursor-pointer text-[#495057] transition duration-300"
                    onClick={() => setDarkState(prev => !prev)}
                    aria-label="Switch to light theme"></i>
                </span> : 
                <span className='w-10 h-10 p-4 rounded-full bg-white flex items-center justify-center
                max-sm:text-xl max-sm:w-6 max-sm:h-6'>    
                    <i className="fa-solid fa-sun hover:cursor-pointer text-[#ffc300] transition duration-300"
                    onClick={() => setDarkState(prev => !prev)}
                    aria-label="Switch to dark theme"></i>
                </span>}
            </div>
            
        </header>
    )
}