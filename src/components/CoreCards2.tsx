
import dedicate from "../assets/home/dedicate.svg";

import hero1 from "../assets/People/hero1.svg";
import hero2 from "../assets/People/hero2.svg";
import hero3 from "../assets/People/hero3.svg";
import blur from "../assets/home/blur.svg";


const CoreCards2 = () => {
    return (
        <div
            className="bg-[#F9F9F9] relative hover:bg-[#011337] cursor-pointer  h-[370px] rounded-[20px] flex flex-col items-start justify-between  p-[2rem] group relative overflow-hidden transition-shadow duration-300 ease-in-out shadow-md group-hover:shadow-xl"
        >
            <img src={blur} alt=""  className='absolute top-[-20%] rounded-full right-[-50%] w-[100%] h-[100%'/>
            <aside className='flex flex-col items-start'>
                <figure
                    className="mb-[1rem] h-50 w-50 p-[1.3rem] rounded-full bg-[#D9D9D9] transition-all duration-300 group-hover:bg-[#003399] group-hover:scale-110 transform"
                >
                    <img src={dedicate} alt="Dedicate" className="transition-transform duration-300 group-hover:scale-110" />

                </figure>
                <h2 className="transition-all text-xl duration-300 group-hover:text-[white]">OpenSource Development</h2>
            </aside>

            {/* Text figure */}
            <figure className="text-left">

                <p className="text-sm my-[1.5rem] transition-all duration-300 group-hover:text-[white] w-[80%]">
                    Custom software development involves creating tailored software solutions to meet the specific needs of a client.
                </p>

                <div className='flex gap-4 '>
                    <img src={hero2} className='w-12 h-12' alt="" />
                    <img src={hero1} className='w-12 h-12'  alt="" />
                    <img src={hero3} className='w-12 h-12'  alt="" />
                </div>
            </figure>
        </div>
    );
};

export default CoreCards2;
