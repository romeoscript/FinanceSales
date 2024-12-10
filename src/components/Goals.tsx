
import Card from './AboutCard'
import rocket from "../assets/home/rocket.svg"

const Goals = () => {
    return (

        <>
            <span className='rounded-full mt-[4rem] block w-[fit-content] m-auto px-4 py-2 bg-[#0033991A] text-[#003399] text-[12px] w-[fit-content]'>
                Core values
            </span>
            <div className='flex flex-col gap-2 items-center text-3xl my-[2rem]'>
                <h2 className='flex gap-2'>Turning Ideas into <img src={rocket} alt="" /> </h2>
                <h2 className=''>Exceptional Software Solutions</h2>
            </div>

            <p className='w-3/5 text-center m-auto mb-[2rem]'>We are committed to bringing your software dreams to life. Through collaboration, our passionate team turns your vision into innovative solutions, delivering exceptional software from concept to launch.</p>
            <div className='grid grid-cols-3 gap-4'>
                <Card title="Cloud Software" description="Together, we create software that not only meets your needs but exceeds expectations, driving your success in a digital-first world." />
                <Card title="Cloud Software" description="Together, we create software that not only meets your needs but exceeds expectations, driving your success in a digital-first world." />
                <Card title="Cloud Software" description="Together, we create software that not only meets your needs but exceeds expectations, driving your success in a digital-first world." />
            </div>
        </>

    )
}

export default Goals
