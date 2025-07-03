import React from 'react';

interface DividerProps {
  children?: React.ReactNode;
  className?: string;
}

function Divider({ children, className }: DividerProps) {
  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 flex-shrink-0 text-xs text-gray-500 uppercase">
        {children}
      </span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}

export default Divider;