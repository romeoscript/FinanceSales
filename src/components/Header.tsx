import React from 'react';

interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
    </div>
);
