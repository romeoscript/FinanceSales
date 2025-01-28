import React from 'react';

interface NearbyReportsSectionProps {
    nearbyRadius: number;
    setNearbyRadius: (radius: number) => void;
    currentLocation: { latitude: number; longitude: number } | null;
    setCurrentLocation: (location: { latitude: number; longitude: number } | null) => void;
    isLocating: boolean;
    setIsLocating: (isLocating: boolean) => void;
    fetchNearbyReports: () => void;
    error: string | null;
    setError: (error: string | null) => void;
}

export const NearbyReportsSection: React.FC<NearbyReportsSectionProps> = ({
    nearbyRadius,
    setNearbyRadius,
    currentLocation,
    setCurrentLocation,
    isLocating,
    setIsLocating,
    fetchNearbyReports,
    error,
    setError,
}) => {
    const getCurrentLocation = () => {
        setIsLocating(true);
        setError(null);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
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

    return (
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
                            {isLocating ? 'Locating...' : 'Get My Location'}
                        </button>
                        <button
                            onClick={fetchNearbyReports}
                            disabled={!currentLocation || isLocating}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition-all"
                        >
                            Find Nearby Reports
                        </button>
                    </div>
                    {currentLocation && (
                        <p className="text-sm text-gray-600 mt-2">
                            Current Location: {currentLocation.latitude.toFixed(4)},{' '}
                            {currentLocation.longitude.toFixed(4)}
                        </p>
                    )}
                </div>
            </div>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
    );
};
