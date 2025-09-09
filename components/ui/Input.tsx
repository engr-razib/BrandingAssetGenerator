
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isRequired?: boolean;
}

const Input: React.FC<InputProps> = ({ label, name, isRequired = false, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-dark-text-secondary mb-1">
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        className="w-full bg-dark-border border-gray-600 text-dark-text-primary rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary transition"
        {...props}
      />
    </div>
  );
};

export default Input;
