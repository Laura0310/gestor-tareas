import React from 'react';

interface ProgressBarProps {
    completed: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="w-full mt-2 mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">{`Progreso: ${percentage}%`}</span>
                <span className="text-xs font-medium text-gray-700">{`${completed}/${total}`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-violet-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;