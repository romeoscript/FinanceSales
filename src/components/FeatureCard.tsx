// components/FeatureCard.tsx
import React from 'react';
import { Feature } from '../types';

export const FeatureCard: React.FC<Feature> = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="text-blue-600" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);