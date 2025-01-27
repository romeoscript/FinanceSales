import React, { useState, useEffect } from 'react';
import { ReportStatus } from '../types';

interface Report {
  _id: string;
  trackingNumber: string;
  status: ReportStatus;
  description: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}

export const AdminReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nearbyRadius, setNearbyRadius] = useState(5); // Default 5 km
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const statusOptions: ReportStatus[] = ['PROCESSING', 'INVESTIGATING', 'RESOLVED'];

  // Fetch all reports
  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/reports');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();
      setReports(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch reports');
    } finally {
      setIsLoading(false);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    setIsLocating(true);
    setError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setIsLocating(false);
        },
        (error) => {
          setError(error.message);
          setIsLocating(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setIsLocating(false);
    }
  };

  // Update report status
  const updateReportStatus = async (trackingNumber: string, newStatus: ReportStatus) => {
    try {
      setIsUpdatingStatus(true);
      const response = await fetch(`http://localhost:5001/api/reports/${trackingNumber}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update report status');
      }

      // Add a slight delay to show the loading animation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Refresh reports list
      await fetchReports();
      setSelectedReport(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update report status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Fetch nearby reports
  const fetchNearbyReports = async () => {
    if (!currentLocation) {
      setError('Please get your current location first');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5001/api/reports/nearby?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&radius=${nearbyRadius}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch nearby reports');
      }

      const data = await response.json();
      setReports(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch nearby reports');
    } finally {
      setIsLoading(false);
    }
  };

  // Get status color
  const getStatusColor = (status: ReportStatus) => {
    const colorMap = {
      'PROCESSING': 'bg-blue-100 text-blue-800',
      'INVESTIGATING': 'bg-orange-100 text-orange-800',
      'RESOLVED': 'bg-green-100 text-green-800'
    };
    return colorMap[status];
  };

  // Initial load
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white">Admin Reports Dashboard</h1>
          </div>

          {/* Location and Nearby Reports Section */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nearby Reports Radius
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    placeholder="Radius (km)"
                    value={nearbyRadius}
                    onChange={(e) => setNearbyRadius(parseFloat(e.target.value))}
                    className="flex-grow p-2 border rounded"
                  />
                  <button
                    onClick={getCurrentLocation}
                    disabled={isLocating}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center"
                  >
                    {isLocating ? (
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Get My Location'
                    )}
                  </button>
                  <button
                    onClick={fetchNearbyReports}
                    disabled={!currentLocation || isLoading}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition-all"
                  >
                    Find Nearby Reports
                  </button>
                </div>
                {currentLocation && (
                  <p className="text-sm text-gray-600 mt-2">
                    Current Location: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Error Handling */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4" role="alert">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Reports List */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking Number</th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 whitespace-nowrap">{report.trackingNumber}</td>
                      <td className="p-4">
                        <div className="max-w-xs truncate">{report.description}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {reports.length === 0 && !isLoading && (
              <div className="p-8 text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <p className="mt-2 text-sm">No reports found</p>
              </div>
            )}
          </div>
        </div>

        {/* Status Update Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Report Status</h2>
              <p className="mb-6 text-gray-600">
                <strong>Tracking Number:</strong> {selectedReport.trackingNumber}
              </p>
              <div className="space-y-4">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => updateReportStatus(selectedReport.trackingNumber, status)}
                    disabled={status === selectedReport.status || isUpdatingStatus}
                    className={`w-full p-3 rounded-lg transition-all relative ${
                      status === selectedReport.status
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                    } ${isUpdatingStatus ? 'cursor-wait' : ''}`}
                  >
                    {isUpdatingStatus ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    ) : null}
                    <span className={isUpdatingStatus ? 'invisible' : ''}>
                      Update to {status}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                disabled={isUpdatingStatus}
                className="mt-6 w-full bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};