
import React from 'react';

export const LoadingSpinner: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-t-teal-500 border-slate-200 rounded-full animate-spin"></div>
      {text && <p className="mt-4 text-slate-600 font-semibold">{text}</p>}
    </div>
  );
};
