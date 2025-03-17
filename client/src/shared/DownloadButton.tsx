import { useState, useRef, useEffect } from "react";

type ExportFormat = 'json' | 'csv';

interface DownloadButtonProps {
    onDownload: (format: ExportFormat) => void;
    className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
    onDownload,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={buttonRef} className={`relative ${className}`}>
            <div
                className="flex cursor-pointer mb-4 select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="border border-violet-500 text-violet-500 py-2 px-2 rounded-l-lg text-sm items-center flex">
                    Exportar
                </div>
                <div className="text-violet-500 py-2 px-2 rounded-r-lg border border-violet-500">
                    <i className={`fa fa-xs fa-chevron-${isOpen ? "up" : "down"}`}></i>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 right-0 mt-0 w-full bg-white shadow-lg rounded-b border border-gray-200">
                    <button
                        onClick={() => onDownload('json')}
                        className="flex items-center w-full px-4 py-3 text-left hover:bg-violet-50 border-b border-gray-100"
                    >
                        <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-blue-600/20 border border-blue-600 mr-2"></span>
                            <span>JSON</span>
                        </div>
                        <i className="fa fa-download ml-auto text-gray-400"></i>
                    </button>
                    <button
                        onClick={() => onDownload('csv')}
                        className="flex items-center w-full px-4 py-3 text-left hover:bg-violet-50"
                    >
                        <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-green-600/20 border border-green-600 mr-2"></span>
                            <span>CSV</span>
                        </div>
                        <i className="fa fa-download ml-auto text-gray-400"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default DownloadButton;