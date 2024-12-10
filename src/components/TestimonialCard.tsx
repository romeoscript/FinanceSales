import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
//   className = ''
}) => {
  return (
    <div className="w-[400px] p-8 bg-white  my-[1rem] rounded-[20px] border border-gray-100 shadow-sm">
      <div className="mb-6">
        <svg className="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>
      
      <p className="text-gray-800 text-left  mb-8">{quote}</p>
      
      <div className="flex items-center gap-4">
        <img 
          src={author.image} 
          alt={author.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className='text-left'>
          <h4 className="font-semibold text-gray-900">{author.name}</h4>
          <p className="text-gray-600 text-sm">{author.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;