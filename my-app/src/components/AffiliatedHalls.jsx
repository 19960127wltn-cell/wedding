'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import './AffiliatedHalls.css';

const partnerLogos = [
  { name: '광역무역센터컨벤션', src: '/logo/광역무역센터컨벤션.png' },
  { name: '그랜드힐컨벤션', src: '/logo/그랜드힐컨벤션.png' },
  { name: '로카우스', src: '/logo/로카우스.png' },
  { name: '분당더메리든', src: '/logo/분당더메리든.png' },
  { name: '서초화이트베일', src: '/logo/서초화이트베일.png' },
  { name: '아이벡스컨벤션', src: '/logo/아이벡스컨벤션.png' },
  { name: '해군호텔', src: '/logo/해군호텔.png' },
  { name: '뷰포토부스', src: '/logo/la-logo-w.png' },
];

const AffiliatedHalls = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [logosVisible, setLogosVisible] = useState(false);
  const [revealedLogos, setRevealedLogos] = useState(Array(partnerLogos.length).fill(false));

  const headerRef = useRef(null);
  const logosRef = useRef(null);

  // Effect for header visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Effect for logos container visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLogosVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the logos container is visible
    );

    if (logosRef.current) {
      observer.observe(logosRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Effect to reveal logos sequentially
  useEffect(() => {
    if (logosVisible) {
      revealedLogos.forEach((_, index) => {
        setTimeout(() => {
          setRevealedLogos(prev => {
            const newRevealed = [...prev];
            newRevealed[index] = true;
            return newRevealed;
          });
        }, index * 100); // 100ms delay between each logo
      });
    }
  }, [logosVisible, revealedLogos]);

  return (
    <section className="affiliated-halls-section">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2
          ref={headerRef}
          className={`benefits-title text-3xl md:text-4xl font-bold text-left leading-relaxed ${headerVisible ? 'visible' : ''}`}
        >
          <span className="text-primary block text-[32px] font-normal mb-2" style={{ fontFamily: 'Weddingday' }}>
            Partner
          </span>
          <span className="text-3xl md:text-4xl font-mj2 font-black block">
            제휴 웨딩홀
          </span>
          <div className="benefits-divider"></div>
        </h2>
        <div ref={logosRef} className="logos-container">
          <div className="logos-grid">
            {partnerLogos.map((logo, index) => (
              <div key={index} className={`logo-item-wrapper ${revealedLogos[index] ? 'visible' : ''}`}>
                <div className={`logo-item ${(logo.name === '분당더메리든' || logo.name === '아이벡스컨벤션') ? 'large-logo-item' : ''}`}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={150}
                    height={80}
                    className={`
                      ${(logo.name === '아이벡스컨벤션' || logo.name === '뷰포토부스') ? 'black-logo' : ''}
                      ${(logo.name === '분당더메리든' || logo.name === '아이벡스컨벤션') ? 'scale-up' : ''}
                    `.trim()}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliatedHalls;

