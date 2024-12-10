import React from 'react';
import hexagon1 from "../assets/home/hexagon.svg";
import hexagon2 from "../assets/home/hexagon2.svg";

interface HexagonCardProps {
    className: string;
}

const HexagonCard: React.FC<HexagonCardProps> = ({ className }) => {
    return (
        <div className={`absolute ${className} h-[300px] w-[300px] flex items-center justify-center`}>
            <img
                src={hexagon2}
                alt=""
                className="absolute "
            />
            <img
                src={hexagon1}
                alt=""
                className="absolute "
            />
        </div>
    );
};

export default HexagonCard;