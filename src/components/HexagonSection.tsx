import React from 'react';
import HexagonCard from './HexagonalCard';
import hexa from '../assets/home/hexabg.svg';



const HexagonGrid: React.FC = () => {
  return (
    <div className="container relative h-screen m-auto  my-[4rem] bg-no-repeat bg-cover bg-center flex gap-4 flex-col items-center justify-center"
    style={{ backgroundImage: `url(${hexa})` }}
    >
      <HexagonCard className="pos0 top-[5%] left-[30%]" />
      <HexagonCard className="pos0 top-[35%] left-[20%]" />
      <HexagonCard className="pos0 top-[5%] left-[50%]" />
      <HexagonCard className="pos0 top-[35%] left-[60%]" />
      <HexagonCard className="pos0 top-[65%] left-[30%]" />
      <HexagonCard className="pos0 top-[65%] left-[50%]" />
      <HexagonCard className="pos0 top-[35%] left-[40%]" />
    </div>
  );
};



export default HexagonGrid;