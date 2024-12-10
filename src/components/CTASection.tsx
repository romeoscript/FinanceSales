import React from 'react';

interface CTASectionProps {
  title: string;
  subtitle: string;
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="w-full bg-[#002B9A] rounded-[20px] overflow-hidden">
      <div className="relative px-8 py-16 bg-gradient-to-br from-blue-900/50 via-blue-800/30 to-transparent flex flex-col items-center gap-8">
        {/* Top Action Button */}
        <button className=" px-4 py-2 text-white bg-blue-700/30 rounded-full hover:bg-blue-700/50 transition-colors">
          Get started
        </button>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-500 text-white mb-4">{title}</h2>
          <p className="text-lg text-blue-100 mb-8">{subtitle}</p>
          
          <button className="px-6 py-3 bg-white text-blue-900 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Try us out now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;