"use client";

import { FiCheckCircle } from 'react-icons/fi';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export const SortModal: React.FC<SortModalProps> = ({ isOpen, onClose, options, selectedOption, onSelectOption }) => {
  if (!isOpen) return null;

  const handleSelect = (option: string) => {
    onSelectOption(option);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
      onClick={onClose}>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 z-50 transition-transform transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">Sort By</h2>
        
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full flex justify-between items-center text-left p-3 rounded-lg hover:bg-gray-100"
            >
              <span className={`font-medium ${selectedOption === option ? 'text-green-600' : 'text-gray-700'}`}>
                {option}
              </span>
              {selectedOption === option && (
                <FiCheckCircle className="text-green-600" size={22} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};