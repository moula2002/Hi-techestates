import React from 'react';

const UniqueLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center w-full">
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-t-4 border-primary-900 animate-spin opacity-80"></div>
        {/* Middle ring */}
        <div className="absolute inset-3 rounded-full border-r-4 border-primary-500 animate-[spin_1.5s_linear_infinite_reverse] opacity-60"></div>
        {/* Inner ring */}
        <div className="absolute inset-6 rounded-full border-b-4 border-charcoal-900 animate-[spin_2s_linear_infinite] opacity-90"></div>
        
        {/* Center icon - Building/Home */}
        <div className="absolute flex items-center justify-center animate-pulse text-primary-900">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-primary-600 uppercase tracking-[0.2em] animate-pulse">
        Loading...
      </h2>
    </div>
  );
};

export default UniqueLoader;
