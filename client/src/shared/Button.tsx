import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className = '' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`p-2 rounded-lg transition-all cursor-pointer text-sm font-montserrat ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;