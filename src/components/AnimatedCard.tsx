import React from 'react';

interface AnimatedCardProps {
  title: string;
  subtitle: string;
  image?: string;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  title, 
  subtitle, 
  image, 

}) => {
  return (
    <div className="relative group w-full max-w-md overflow-hidden rounded-[20px] cursor-pointer transition-all duration-300 hover:scale-[1.02]">
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-left">
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-200 mb-1">{subtitle}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Design & Development</span>
              <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <svg 
                  className="w-5 h-5 text-white transform group-hover:rotate-45 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;