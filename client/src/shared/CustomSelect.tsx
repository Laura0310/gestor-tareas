import React, { useState, useRef, useEffect } from "react";

export interface SelectOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
    color?: string;
}

interface SelectProps<T extends string> {
    options: SelectOption[];
    value: T;
    onChange: (value: T) => void;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    error?: string;
    required?: boolean;
    getOptionStyle?: (option: SelectOption) => string;
    getOptionIconStyle?: (option: SelectOption) => string;
}

function Select<T extends string>({
    options,
    value,
    onChange,
    label,
    placeholder = "Seleccione una opción",
    className = "",
    disabled = false,
    error,
    required = false,
    getOptionStyle,
    getOptionIconStyle
}: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
        options.find((option) => option.value === value) || null
    );
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedOption(options.find((option) => option.value === value) || null);
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: SelectOption) => {
        setSelectedOption(option);
        onChange(option.value as T);
        setIsOpen(false);
    };

    const getSelectedOptionStyle = (option: SelectOption) => {
        if (selectedOption?.value === option.value) {
            return "bg-violet-100 font-medium";
        }
        return "";
    };

    const getDefaultOptionIconStyle = (option: SelectOption) => {
        if (option.color) {
            return option.color;
        }
        return "bg-gray-400";
    };

    const renderOptionIcon = (option: SelectOption) => {
        if (option.icon) {
            return option.icon;
        }
        return (
            <span
                className={`h-3 w-3 rounded-full inline-block ${getOptionIconStyle ? getOptionIconStyle(option) : getDefaultOptionIconStyle(option)
                    }`}
            ></span>
        );
    };

    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label className="block text-sm mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div ref={selectRef} className="relative">
                <div
                    className={`p-2 border rounded w-full flex justify-between items-center ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"
                        } ${error ? "border-red-500" : isOpen ? "border-violet-500" : "border-gray-300"}`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                >
                    {selectedOption ? (
                        <div className="flex items-center gap-2">
                            {renderOptionIcon(selectedOption)}
                            <span>{selectedOption.label}</span>
                        </div>
                    ) : (
                        <span className="text-gray-400">{placeholder}</span>
                    )}
                    <span className="text-gray-400">
                        <i className={`fa fa-solid fa-chevron-${isOpen ? "up" : "down"}`}></i>
                    </span>
                </div>

                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                {isOpen && !disabled && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`p-2 cursor-pointer hover:bg-gray-100 ${getOptionStyle ? getOptionStyle(option) : getSelectedOptionStyle(option)
                                    }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                <div className="flex items-center gap-2">
                                    {renderOptionIcon(option)}
                                    <span>{option.label}</span>
                                </div>
                            </div>
                        ))}
                        {options.length === 0 && (
                            <div className="p-2 text-gray-500 text-center">No hay opciones disponibles</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Select;