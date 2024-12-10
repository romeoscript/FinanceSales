
import dedicate from "../assets/home/dedicate.svg";


const CoreCards = () => {
  return (
    <div
      className="bg-[#F9F9F9] relative hover:bg-[#F5FFFC] cursor-pointer w-[200px] h-[310px] rounded-[20px] flex flex-col items-start justify-end p-[0.7rem] py-[1rem] group relative overflow-hidden transition-shadow duration-300 ease-in-out shadow-md group-hover:shadow-xl"
    >
      <span className='absolute top-5 left-3 text-[#D9D9D9]'>
        01/
      </span>
      <figure
        className="mb-[1rem] h-50 w-50 p-[0.7rem] rounded-full bg-[#D9D9D9] transition-all duration-300 group-hover:bg-[#003399] group-hover:scale-110 transform"
      >
        <img src={dedicate} alt="Dedicate" className="transition-transform duration-300 group-hover:scale-110" />
      </figure>
      {/* The card number */}

      {/* Text figure */}
      <figure className="text-left">
        <h2 className="transition-all duration-300 group-hover:text-[#1E1E1E]">OpenSource Development</h2>
        <p className="text-[12px] my-[1rem] transition-all duration-300 group-hover:text-[#1E1E1E]">
          Lorem ipsum set ferrat dagorrat yuhed beveyyet
        </p>
      </figure>
    </div>
  );
};

export default CoreCards;
