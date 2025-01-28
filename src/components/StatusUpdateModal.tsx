import React from 'react';
import { ReportStatus } from '../types';

interface StatusUpdateModalProps {
    selectedReport: { trackingNumber: string; status: ReportStatus };
    setSelectedReport: (report: null) => void;
    updateReportStatus: (trackingNumber: string, newStatus: ReportStatus) => void;
    statusOptions: ReportStatus[];
}

export const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
    selectedReport,
    setSelectedReport,
    updateReportStatus,
    statusOptions,
}) => {
    return (
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
                            className={`w-full p-3 rounded-lg transition-all ${
                                status === selectedReport.status
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            Update to {status}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setSelectedReport(null)}
                    className="mt-6 w-full bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
