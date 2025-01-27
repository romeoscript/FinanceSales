// components/StatusTracker.tsx
import React from 'react';
import { ReportStatus } from '../types';

export const StatusTracker: React.FC<{ currentStatus?: ReportStatus }> = ({ 
  currentStatus = 'processing' 
}) => {
  const steps: ReportStatus[] = ['submitted', 'processing', 'investigating', 'resolved'];
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Track Report Status</h3>
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors
              ${steps.indexOf(currentStatus) >= index 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'}`}
            >
              {index + 1}
            </div>
            <span className="text-sm text-gray-600 capitalize">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};