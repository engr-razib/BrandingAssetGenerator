
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isRequired?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, isRequired = false, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-dark-text-secondary mb-1">
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        className="w-full bg-dark-border border-gray-600 text-dark-text-primary rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary transition"
        {...props}
      ></textarea>
    </div>
  );
};

export default TextArea;
