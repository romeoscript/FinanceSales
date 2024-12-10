// import React from 'react'
import AnimatedCard from './AnimatedCard'
import kwick from "../assets/product/kwick.svg";
import outat from "../assets/product/outat.svg";


const Products = () => {
    return (
        <div className='my-[4rem]'>
            <p className='rounded-full text-left px-4 py-2 bg-[#0033991A] text-[#003399] text-[12px] w-[fit-content]'>
                Core values
            </p>
            <p className='text-3xl text-left my-[1rem]'>Made By Qubic </p>

            <div className='grid grid-cols-4 gap-4'>
                <AnimatedCard
                    title="Outat TV"
                    subtitle="Online Streaming Platform"
                    image={outat}
                />
                <AnimatedCard
                    title="Outat TV"
                    subtitle="Online Streaming Platform"
                    image={kwick}
                />
                <AnimatedCard
                    title="Outat TV"
                    subtitle="Online Streaming Platform"
                    image={outat}
                />
                <AnimatedCard
                    title="Outat TV"
                    subtitle="Online Streaming Platform"
                    image={kwick}
                />
            </div>
        </div>
    )
}

export default Products
