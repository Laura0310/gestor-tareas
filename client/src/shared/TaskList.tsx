import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, label, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(options.find((option) => option.value === value) || null);
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

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const getSelectedOptionStyle = (option: Option) => {
    if (selectedOption?.value === option.value) {
      return "bg-violet-100 font-medium";
    }
    return "";
  };

  const getStatusColor = (value: string) => {
    switch (value) {
      case "TO_DO":
        return "bg-red-600/20 border-red-600";
      case "IN_PROGRESS":
        return "bg-yellow-600/20 border-yellow-600";
      case "DONE":
        return "bg-green-600/20 border-green-600";
      default:
        return "";
    }
  };

  return (
    <div className="mb-3">
      {label && <p className="text-sm mb-1">{label}</p>}
      <div ref={selectRef} className={`relative ${className}`}>
        <div
          className={`p-2 border rounded w-full flex justify-between items-center cursor-pointer ${
            isOpen ? "border-violet-500" : "border-gray-300"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? (
            <div className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full inline-block ${getStatusColor(selectedOption.value)}`}></span>
              <span>{selectedOption.label}</span>
            </div>
          ) : (
            <span className="text-gray-400">Seleccione una opción</span>
          )}
          <span className="text-gray-400">
            <i className={`fa fa-solid fa-chevron-${isOpen ? "up" : "down"}`}></i>
          </span>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${getSelectedOptionStyle(option)}`}
                onClick={() => handleOptionClick(option)}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full inline-block ${getStatusColor(option.value)}`}></span>
                  <span>{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
