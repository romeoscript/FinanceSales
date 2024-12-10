
import CoreCards from './CoreCards'
import { Link } from 'react-router-dom'
import brain from "../assets/home/brain.svg"
import CoreCards2 from './CoreCards2'

const CoreValues = () => {
    return (
        <>
            <div className='flex gap-8 my-[4rem]'>
                <aside className='flex gap-4'>
                    <CoreCards />
                    <CoreCards />
                    <CoreCards />
                </aside>
                <aside className='text-left flex flex-col gap-4'>
                    <span className='rounded-full px-4 py-2 bg-[#0033991A] text-[#003399] text-[12px] w-[fit-content]'>
                        Core values
                    </span>
                    <h1 className='mt-[2rem] text-3xl'>OpenSource Development</h1>
                    <p>A well positioned solution offering classy services to support all your business needs via opensource.</p>
                    <Link to="/auth/login" className="text-white px-4 py-2 rounded-full w-[fit-content] bg-[#003399]">
                        Try us out now
                    </Link>
                </aside>
            </div>

            <div className='text-left flex flex-col gap-4'>
                <span className='rounded-full px-4 py-2 bg-[#0033991A] text-[#003399] text-[12px] w-[fit-content]'>
                    Core values
                </span>
                <p className='text-3xl'>Explore Our <br />
                    <span className='flex items-center gap-4'> Core Services <img src={brain} alt="brain" /></span></p>

                <div className='grid grid-cols-2 gap-8'>
                    <CoreCards2 />
                    <CoreCards2 />
                </div>
            </div>
        </>
    )
}

export default CoreValues
