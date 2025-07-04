import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  type: string;
  className: string;
}
function Button({  children, type, className }) {
  return (
    <button type={type} className={className}>
      {children} 
    </button>
  );
}

export default Button;