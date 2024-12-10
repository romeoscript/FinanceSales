import  { useState } from 'react';

interface PricingFeature {
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  features: PricingFeature[];
  isPopular?: boolean;
}

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const features: PricingFeature[] = [
    {
      title: 'UI/UX Design',
      description: 'Full-scale design services tailored to enterprise needs, including user research and high-fidelity prototypes (custom hours)'
    },
    {
      title: 'Data Analysis',
      description: 'Advanced analytics with machine learning and AI insights (custom hours)'
    },
    {
      title: 'Project/Product Management',
      description: 'Enterprise-level project and product management with dedicated teams (custom hours)'
    },
    {
      title: 'Marketing',
      description: 'Comprehensive marketing services including SEO, PPC, content marketing and more (custom hours)'
    },
    {
      title: 'DevOps',
      description: 'Complete DevOps solutions including cloud management, security, and continuous delivery (custom hours)'
    },
    {
      title: 'Support',
      description: 'Personalized 24/7 support with a dedicated team'
    },
    {
      title: 'Reports',
      description: 'Daily progress reports'
    }
  ];

  const plans: PricingPlan[] = [
    {
      name: 'Startup plan',
      monthlyPrice: '₦80,000',
      annualPrice: '₦800,000',
      features: features
    },
    {
      name: 'Enterprise plan',
      monthlyPrice: '₦150,000',
      annualPrice: '₦1,500,000',
      features: features,
      isPopular: true
    },
    {
      name: 'Premium plan',
      monthlyPrice: '₦100,000',
      annualPrice: '₦1,000,000',
      features: features
    }
  ];

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Payment Toggle */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <span className={`text-gray-600 ${!isAnnual ? 'font-semibold' : ''}`}>Monthly</span>
        <button 
          onClick={handleToggle}
          className="relative w-16 h-8 rounded-full bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          role="switch"
          aria-checked={isAnnual}
        >
          <div 
            className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-200 ease-in-out ${
              isAnnual ? 'translate-x-9' : 'translate-x-1'
            }`} 
          />
        </button>
        <span className={`text-gray-600 ${isAnnual ? 'font-semibold' : ''}`}>Annual</span>
        {isAnnual && (
          <span className="text-sm text-green-600 font-medium">Save 20%</span>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg p-8 ${
              plan.isPopular ? 'bg-blue-900 text-white' : 'bg-gray-50'
            } relative flex flex-col`}
          >
            {plan.isPopular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Enterprise plan
              </span>
            )}
            
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-wide mb-4">{plan.name}</h3>
              <div className="relative">
                <p className="text-3xl font-bold mb-4">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  <span className="text-sm font-normal ml-1">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </p>
                {!isAnnual && (
                  <p className={`text-sm ${plan.isPopular ? 'text-blue-100' : 'text-gray-500'}`}>
                    Billed monthly
                  </p>
                )}
                {isAnnual && (
                  <p className={`text-sm ${plan.isPopular ? 'text-blue-100' : 'text-gray-500'}`}>
                    Billed annually (save 20%)
                  </p>
                )}
              </div>
              <button
                className={`w-full py-2 px-4 rounded-md ${
                  plan.isPopular
                    ? 'bg-white text-blue-900'
                    : 'bg-blue-600 text-white'
                } hover:opacity-90 transition-opacity`}
              >
                Buy this plan
              </button>
            </div>

            <div className="space-y-4">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start gap-2">
                  <svg
                    className={`w-5 h-5 ${plan.isPopular ? 'text-white' : 'text-blue-600'} mt-1 flex-shrink-0`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className={`text-sm ${plan.isPopular ? 'text-blue-100' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      </div>
    </div>
  );
};

export default PricingSection;