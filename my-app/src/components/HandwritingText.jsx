'use client';

import React from 'react';
import './Handwriting.css';

const HandwritingText = ({ className = "", animate = false, isSmallMobile = false }) => {
  return (
    <div className={`${isSmallMobile ? 'w-full' : 'w-[150%] -ml-[25%]'} max-w-none mx-auto text-center pointer-events-none select-none ${className}`}>
      <svg
        viewBox="700 300 1600 500"
        className="w-full h-auto overflow-visible"
        style={{
          opacity: animate ? 1 : 0,
          transition: 'opacity 0.8s ease',
          transform: isSmallMobile ? 'scale(1.1)' : 'scale(1.1)',
          transformOrigin: 'center center'
        }}
      >
        <defs>
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.6)">
              <animate
                attributeName="offset"
                values="-0.5; 1.5"
                dur="2.5s"
                repeatCount="1"
                begin="1s"
                fill="freeze"
              />
            </stop>
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          <mask id="text-reveal-mask">
            <rect
              x="0"
              y="0"
              width={animate ? "3000" : "0"}
              height="1000"
              fill="white"
              style={{ transition: 'width 2.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </mask>
        </defs>

        <text
          x="1500"
          y="600"
          className="drawing-text"
          mask="url(#text-reveal-mask)"
          style={{
            fill: 'url(#shimmer)',
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))',
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