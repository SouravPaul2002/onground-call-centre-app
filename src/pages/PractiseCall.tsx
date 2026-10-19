import React from 'react';
import type { PageId } from '../types';

interface PractiseCallProps {
  onNavigate?: (page: PageId) => void;
}

export const PractiseCall: React.FC<PractiseCallProps> = () => {
  return (
    <div className="w-full max-w-[1180px] mx-auto p-8 flex flex-col items-center justify-center min-h-[400px]">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm max-w-md w-full">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">practise page</h1>
        <p className="text-sm text-slate-500">This is a dummy practise page.</p>
      </div>
    </div>
  );
};
