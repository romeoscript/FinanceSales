import React from 'react';
import team01 from '../assets/home/Romeo.svg';
import team02 from '../assets/home/Romeo.svg';
import team03 from '../assets/home/Romeo.svg';
import team04 from '../assets/home/Romeo.svg';
import { RiLinkedinLine, RiTwitterLine, RiFacebookLine } from 'react-icons/ri';

interface TeamMember {
  imgUrl: string;
  name: string;
  position: string;
}

const teamMembers: TeamMember[] = [
  {
    imgUrl: team01,
    name: 'Thein Dan Ma',
    position: 'Production Designer'
  },
  {
    imgUrl: team02,
    name: 'Ngwe Pu',
    position: 'Product Designer'
  },
  {
    imgUrl: team03,
    name: 'OK Tal Mg Lay',
    position: 'Customer Service'
  },
  {
    imgUrl: team04,
    name: 'Ma Ma Saung',
    position: 'Project Leader'
  }
];

const Team: React.FC = () => {
  return (
    <section className="our__team py-20">
      <div className="container mx-auto">
        <div className="team__content text-center">
          <h6 className="subtitle text-gray-500 font-medium mb-4">Our Team</h6>
          <h2 className="text-3xl font-bold">
            Join With <span className="highlight text-blue-500">Our Team</span>
          </h2>
        </div>
        <div className="team__wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((item, index) => (
            <div className="team__item relative" key={index}>
              <div className="team__img">
                <img src={item.imgUrl} alt="" className="w-full h-auto z-20" />
              </div>
              <div className="team__details text-center py-4 absolute bottom-0 left-0 h-[50%] flex flex-col justify-end p-[1rem] text-white items-start  rounded-lg w-full bg-gradient-to-t from-[rgba(0,37,113,0.8)] ">
                <h4 className="text-3xl font-400">{item.name}</h4>
                <p className="description ">{item.position}</p>
                <div className="team__member-social flex justify-center space-x-4 mt-4">
                  <span className="text-gray-500 hover:text-blue-500 cursor-pointer">
                    <RiLinkedinLine />
                  </span>
                  <span className="text-gray-500 hover:text-blue-500 cursor-pointer">
                    <RiTwitterLine />
                  </span>
                  <span className="text-gray-500 hover:text-blue-500 cursor-pointer">
                    <RiFacebookLine />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;