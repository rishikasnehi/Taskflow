import React from 'react';

export const Input = React.forwardRef(
  ({ className = '', error = '', label = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`input-field ${error ? 'border-error focus:ring-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
