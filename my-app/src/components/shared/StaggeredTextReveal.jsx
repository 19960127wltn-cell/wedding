'use client';

import React from 'react';

/**
 * StaggeredTextReveal renders all phrases immediately but uses staggered 
 * CSS animation delays for a smooth, high-end reveal effect.
 */
export default function StaggeredTextReveal({ 
  phrases = [], 
  delayPerPhrase = 400, // ms
  className = "",
  isSmallMobile // Accept new prop
}) {
  // Convert delay to seconds
  const delaySec = delayPerPhrase > 10 ? delayPerPhrase / 1000 : delayPerPhrase;

  return (
    <div 
      className={`font-mj leading-tight tracking-wide font-light ${className}`}
      style={isSmallMobile ? { fontSize: '80%' } : {}} // Apply conditional style
    >
      {phrases.map((phrase, index) => (
        <span
          key={index}
          className="block opacity-0 animate-premiumReveal font-mj2" // Added font-serif
          style={{ 
            animationDelay: `${index * delaySec}s`,
            marginBottom: index < phrases.length - 1 ? '0.3em' : '0' 
          }}
        >
          {phrase}
        </span>
      ))}
    </div>
  );
}