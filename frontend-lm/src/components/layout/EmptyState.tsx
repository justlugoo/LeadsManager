import React from 'react';

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="mx-auto w-12 h-12 text-light-300 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-light-100 mb-2">{title}</h3>
      <p className="text-light-300 mb-6 max-w-sm mx-auto">{description}</p>
      {action && action}
    </div>
  );
}; 