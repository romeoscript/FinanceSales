
import heroSvg from "../assets/home/abouthero.svg";




const Hero = () => {
    return (
        <div
            className="h-[80vh] w-full rounded-[20px] text-white bg-no-repeat my-[1rem] bg-cover bg-center flex gap-4 flex-col items-center justify-center"
            style={{ backgroundImage: `url(${heroSvg})` }}
        >
          
            <div className='flex items-center flex-col gap-6 mt-[1rem]'>

                <h2 className='font-400 text-3xl'>Empowering Businesses</h2>
                <h1 className='flex items-center text-5xl font-500'>Through Digital Innovation</h1>
                <p className='w-2/5 text-sm'>At Qubic NG, we specialize in delivering cutting-edge digital software solutions tailored to meet the unique needs of modern businesses. Since 2022, we’ve helped several companies and established brands reimagine their business processes, driving growth and enhancing efficiency through innovative technology. From intuitive web development and robust software design to enterprise tools, our mission is to transform ideas into impactful digital experiences. With a customer-centric approach and a team of industry experts, we’re here to help your business thrive in an ever-evolving digital landscape</p>

               
            </div>

        </div>
    );
};

export default Hero;
