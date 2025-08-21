'use client';

import { ReactNode } from 'react';
import Icon from './Icon';

interface CardProps {
  title?: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export default function Card({ 
  title, 
  icon, 
  children, 
  className = '', 
  actions,
  variant = 'default' 
}: CardProps) {
  const variantClasses = {
    default: 'bg-white/95 border-green-200',
    success: 'bg-emerald-50/95 border-emerald-200',
    warning: 'bg-yellow-50/95 border-yellow-200',
    danger: 'bg-red-50/95 border-red-200',
    info: 'bg-blue-50/95 border-blue-200'
  };

  const titleColors = {
    default: 'text-gray-900',
    success: 'text-emerald-800',
    warning: 'text-yellow-800',
    danger: 'text-red-800',
    info: 'text-blue-800'
  };

  return (
    <div className={`${variantClasses[variant]} backdrop-blur-lg border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}>
      {title && (
        <div className="flex items-center justify-between p-6 border-b border-current/10">
          <h2 className={`text-xl font-semibold ${titleColors[variant]} flex items-center`}>
            {icon && <Icon name={icon} size={24} className="mr-3" />}
            {title}
          </h2>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}