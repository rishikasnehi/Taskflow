import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export const Alert = ({ type = 'info', message, onClose = null, className = '' }) => {
  const typeClasses = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300',
      icon: 'text-blue-600 dark:text-blue-400',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300',
      icon: 'text-green-600 dark:text-green-400',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: 'text-yellow-600 dark:text-yellow-400',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300',
      icon: 'text-red-600 dark:text-red-400',
    },
  };

  const config = typeClasses[type];
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  const IconComponent = icons[type];

  return (
    <div
      className={`
        ${config.bg} ${config.border} ${config.text}
        border rounded-lg p-4 flex items-gap-3
        ${className}
      `}
    >
      <IconComponent size={20} className={`${config.icon} flex-shrink-0 mt-0.5`} />
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className={`${config.icon} hover:opacity-70 transition-opacity`}
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};
