import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder: string;
    className: string;
}

function Input({ type, placeholder, className, ...props }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      {...props} 
    />
  );
}

export default Input;