import React from 'react';
import { ReportStatus } from '../types';

interface Evidence {
    id: number;
    fileUrl: string;
    fileType: string;
    createdAt: string;
}

interface Report {
    _id: string;
    trackingNumber: string;
    status: ReportStatus;
    description: string;
    type: string;
    createdAt: string;
    evidence: Evidence[];
}

interface ReportsTableProps {
    reports: Report[];
    isLoading: boolean;
    setSelectedReport: (report: Report) => void;
    setSelectedEvidence: (evidence: Evidence | null) => void;
}

export const ReportsTable: React.FC<ReportsTableProps> = ({
    reports,
    isLoading,
    setSelectedReport,
    setSelectedEvidence,
}) => {
    const getStatusColor = (status: ReportStatus) => {
        const colorMap = {
            PROCESSING: 'bg-blue-100 text-blue-800',
            INVESTIGATING: 'bg-orange-100 text-orange-800',
            RESOLVED: 'bg-green-100 text-green-800',
        };
        return colorMap[status];
    };

    return (
        <div className="overflow-x-auto">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tracking Number
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
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
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                            report.status
                                        )}`}
                                    >
                                        {report.status}
                                    </span>
                                </td>
                                <td className="p-4">{report.type}</td>
                                <td className="p-4 whitespace-nowrap">
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 space-x-2">
                                    <button
                                        onClick={() => setSelectedReport(report)}
                                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                    >
                                        Update Status
                                    </button>
                                    {report.evidence && report.evidence.length > 0 && (
                                        <button
                                            onClick={() => setSelectedEvidence(report.evidence[0])}
                                            className="text-green-600 hover:text-green-800 hover:underline transition-colors"
                                        >
                                            View Evidence
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {reports.length === 0 && !isLoading && (
                <div className="p-8 text-center text-gray-500">
                    <p>No reports found</p>
                </div>
            )}
        </div>
    );
};
