
import React from 'react';

interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer bg-dark-border p-2 rounded-md hover:bg-gray-600 transition-colors">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="form-checkbox h-4 w-4 text-brand-primary bg-dark-surface border-dark-border rounded focus:ring-brand-light"
      />
      <span className="text-dark-text-primary text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;
