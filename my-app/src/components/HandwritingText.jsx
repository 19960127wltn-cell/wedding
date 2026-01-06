'use client';

import React from 'react';
import './Handwriting.css';

const HandwritingText = ({ className = "", animate = false }) => {
  return (
    <div className={`w-full max-w-3xl mx-auto text-center pointer-events-none select-none ${className}`}>
      <svg 
        viewBox="0 0 1100 400" 
        className="w-full h-auto overflow-visible"
        style={{ opacity: animate ? 1 : 0, transition: 'opacity 0.8s ease' }}
      >
        <defs>
          <mask id="text-reveal-mask">
            <rect 
              x="0" 
              y="0" 
              width={animate ? "1100" : "0"} 
              height="400" 
              fill="white" 
              style={{ transition: 'width 2.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </mask>
        </defs>
        
        <text 
          x="550" 
          y="250" 
          className="drawing-text" 
          mask="url(#text-reveal-mask)"
          style={{ 
            fill: 'var(--primary)',
            visibility: animate ? 'visible' : 'hidden'
          }}
        >
          Vue Photobuth
        </text>
      </svg>
    </div>
  );
};

export default HandwritingText;