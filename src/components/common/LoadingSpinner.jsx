import React from 'react';
import { Globe } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border-2 border-blue-500/20 flex items-center justify-center text-blue-600 animate-spin">
          <Globe className="w-7 h-7" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-slate-800 font-sans tracking-tight">
          TRAVEL<span className="text-blue-600">VERSE</span>
        </p>
        <p className="text-[11px] text-slate-400">Loading global travel feed...</p>
      </div>
    </div>
  );
}

