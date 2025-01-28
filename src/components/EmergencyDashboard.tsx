// components/EmergencyDashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import audio2 from './alert-33762.mp3'

interface Emergency {
    id: number;
    description: string;
    status: 'PENDING' | 'RESPONDED' | 'RESOLVED';
    createdAt: string;
}

const EmergencyAlert: React.FC<{ emergency: Emergency; onStatusUpdate: (id: number, status: string) => Promise<void> }> = ({ 
    emergency, 
    onStatusUpdate 
}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(audio2);
        audio.loop = true;
        audioRef.current = audio;

        if (isPlaying && emergency.status === 'PENDING') {
            audio.play().catch(err => console.error('Audio playback failed:', err));
        }

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [isPlaying, emergency.status]);

    const toggleSound = () => {
        setIsPlaying(!isPlaying);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => console.error('Audio playback failed:', err));
            }
        }
    };

    return (
        <div className={`flex items-center justify-between p-4 ${
            emergency.status === 'PENDING' 
                ? 'bg-red-100 animate-pulse' 
                : emergency.status === 'RESPONDED'
                    ? 'bg-yellow-100'
                    : 'bg-green-100'
        } rounded-lg mb-2`}>
            <div>
                <div className="flex items-center space-x-2">
                    <span className={`h-3 w-3 rounded-full ${
                        emergency.status === 'PENDING' ? 'bg-red-500' : 
                        emergency.status === 'RESPONDED' ? 'bg-yellow-500' : 'bg-green-500'
                    } ${emergency.status === 'PENDING' ? 'animate-ping' : ''}`}></span>
                    <h3 className="font-bold text-gray-800">Emergency Report #{emergency.id}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">{emergency.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                    Reported: {new Date(emergency.createdAt).toLocaleString()}
                </p>
            </div>
            <div className="flex items-center space-x-2">
                {emergency.status === 'PENDING' && (
                    <button
                        onClick={toggleSound}
                        className="p-2 rounded-full hover:bg-white/50 transition-colors"
                        title={isPlaying ? "Mute Alert" : "Unmute Alert"}
                    >
                        {isPlaying ? (
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.343 9.657L14 2l1 19-8.657-7.657a2 2 0 01-2.828 0L1.172 11A2 2 0 013.343 8.172l3 3z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        )}
                    </button>
                )}
                <select
                    onChange={(e) => onStatusUpdate(emergency.id, e.target.value)}
                    value={emergency.status}
                    className="ml-2 border rounded p-2 text-sm"
                >
                    <option value="PENDING">PENDING</option>
                    <option value="RESPONDED">RESPONDED</option>
                    <option value="RESOLVED">RESOLVED</option>
                </select>
            </div>
        </div>
    );
};

export const EmergencyDashboard: React.FC = () => {
    const [emergencies, setEmergencies] = useState<Emergency[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchEmergencies = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/emergency');
            if (!response.ok) throw new Error('Failed to fetch emergencies');
            const data = await response.json();
            setEmergencies(data.data);
        } catch (error) {
            console.error('Error fetching emergencies:', error);
            setError('Failed to fetch emergencies');
        }
    };

    const updateEmergencyStatus = async (id: number, status: string) => {
        try {
            const response = await fetch(`http://localhost:5001/api/emergency/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) throw new Error('Failed to update emergency status');
            fetchEmergencies();
        } catch (error) {
            console.error('Error updating emergency status:', error);
            setError('Failed to update emergency status');
        }
    };

    useEffect(() => {
        fetchEmergencies();
        const interval = setInterval(fetchEmergencies, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-600">Emergency Reports</h2>
                <span className="text-sm text-gray-500">Auto-refreshes every 30 seconds</span>
            </div>
            
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {emergencies.length > 0 ? (
                <div className="space-y-2">
                    {emergencies.map(emergency => (
                        <EmergencyAlert 
                            key={emergency.id} 
                            emergency={emergency}
                            onStatusUpdate={updateEmergencyStatus}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No emergency reports</p>
            )}
        </div>
    );
};