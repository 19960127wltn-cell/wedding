'use client';

import React from 'react';
import StaggeredTextReveal from '@/components/shared/StaggeredTextReveal';
import './WeddingHero.css';

const WeddingHero = () => {
  return (
    <section className="wedding-hero">
      <div className="wedding-hero-bg">
        <img
          src="/images/hero-wedding1.png"
          alt="Wedding Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="wedding-hero-overlay"></div>
      </div>

      <div className="wedding-hero-content max-w-7xl mx-auto px-6 md:px-8">
        <div className="wedding-hero-text-wrapper">
          <h1 className="wedding-hero-title opacity-0 animate-[fadeInDown_1.2s_ease-out_forwards]">
            Wedding
          </h1>

          <div className="wedding-hero-divider opacity-0 animate-[scaleIn_1s_ease-out_0.5s_forwards]"></div>

          <StaggeredTextReveal
            phrases={[
              "깊게 남을 그날의 감동과,",
              "선명하게 기억될 하객의 미소,",
              "모든 순간을 소중히 담아드릴게요"
            ]}
            className="wedding-hero-description"
            delayPerPhrase={800}
          />
        </div>
      </div>

      <div className="wedding-hero-scroll-indicator">
        <div className="scroll-lane">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;
