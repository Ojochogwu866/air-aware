import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin">
      <div className="h-full w-full rounded-full border-4 border-[#008060]/30 border-t-[#008060]" />
    </div>
  </div>
);