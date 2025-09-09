
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-dark-surface border border-dark-border rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
