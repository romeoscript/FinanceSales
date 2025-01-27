import React, { useState } from 'react';
import { ReportStatus } from '../types';

export const StatusTracker: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [currentStatus, setCurrentStatus] = useState<ReportStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportDetails, setReportDetails] = useState<any>(null);

  const steps: ReportStatus[] = ['submitted', 'processing', 'investigating', 'resolved'];

  const fetchReportStatus = async () => {
    // Reset previous state
    setCurrentStatus(null);
    setReportDetails(null);
    setError(null);
    
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5001/api/reports/${trackingNumber}`);
      
      if (!response.ok) {
        throw new Error('Report not found');
      }

      const data = await response.json();
      console.log(data.data, 'report details')
      
      if (data.data && data.data.status) {
        setCurrentStatus(data.data.status);
        setReportDetails(data.data);
      } else {
        setError('No status found for this tracking number');
      }
    } catch (err) {
      console.error('Error fetching report status:', err);
      setError(err instanceof Error ? err.message : 'Unable to fetch report status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReportStatus();
  };

  const getStatusColor = (status: ReportStatus) => {
    const colorMap = {
      'submitted': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'investigating': 'bg-orange-100 text-orange-800',
      'resolved': 'bg-green-100 text-green-800'
    };
    return colorMap[status];
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xl mx-auto my-8">
      <div className="p-6 bg-gray-50 border-b">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter Tracking Number"
            className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-300"
          >
            {isLoading ? 'Searching...' : 'Track'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4" role="alert">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {currentStatus && reportDetails && (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Status</h2>
            <div className="flex justify-between items-center space-x-4">
              {steps.map((step, index) => (
                <div 
                  key={step} 
                  className="flex flex-col items-center flex-1"
                >
                  <div 
                    className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 border-2 ${
                      steps.indexOf(currentStatus) >= index 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-gray-200 text-gray-500 border-gray-300'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-sm font-medium capitalize ${
                    steps.indexOf(currentStatus) >= index 
                      ? 'text-blue-600' 
                      : 'text-gray-400'
                  }`}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Tracking Number</p>
              <p className="font-semibold text-gray-800">{reportDetails.trackingNumber}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Current Status</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
                {currentStatus}
              </div>
            </div>
          </div>

          {reportDetails.description && (
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Report Description</h3>
              <p className="text-gray-600">{reportDetails.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};