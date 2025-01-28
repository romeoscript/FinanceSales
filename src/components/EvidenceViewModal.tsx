import React from 'react';

interface Evidence {
    id: number;
    fileUrl: string;
    fileType: string;
    createdAt: string;
}

interface EvidenceViewModalProps {
    selectedEvidence: Evidence;
    setSelectedEvidence: (evidence: null) => void;
    selectedReport: { trackingNumber: string; description: string; type: string };
    setSelectedReport: (report: null) => void;
}

export const EvidenceViewModal: React.FC<EvidenceViewModalProps> = ({
    selectedEvidence,
    setSelectedEvidence,
    selectedReport,
    setSelectedReport,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Report Evidence</h2>
                    <button
                        onClick={() => {
                            setSelectedEvidence(null);
                            setSelectedReport(null);
                        }}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Close
                    </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Report Details</h3>
                        <p><strong>Tracking Number:</strong> {selectedReport.trackingNumber}</p>
                        <p><strong>Description:</strong> {selectedReport.description}</p>
                        <p><strong>Type:</strong> {selectedReport.type}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Evidence</h3>
                        <img
                            src={selectedEvidence.fileUrl}
                            alt="Report Evidence"
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <p className="mt-4 text-sm text-gray-600">
                            <strong>Uploaded:</strong> {new Date(selectedEvidence.createdAt).toLocaleString()}
                            <br />
                            <strong>File Type:</strong> {selectedEvidence.fileType}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
