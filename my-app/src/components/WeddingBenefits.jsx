'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { PartyPopper, Camera, User, Sparkles, Heart } from 'lucide-react';
import './WeddingBenefits.css';

const CameraFlash = () => {
    return (
        <div className="camera-flash-container">
            <Sparkles className="sparkle-1" size={18} />
        </div>
    );
};

const HeartInteraction = () => (
    <div className="heart-flash-container">
        <div className="main-flash"></div>
        <Heart className="sparkle-1" size={14} color="var(--primary)" />
        <Heart className="sparkle-2" size={8} color="rgba(255,255,255,0.8)" />
    </div>
);


const PopperGlints = () => {
    return (
        <div className="popper-glint-container">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <g className="popper-glint-squares">
                    <rect x="15" y="4" width="2.5" height="2.5" className="popper-square" />
                    <rect x="12" y="6" width="2" height="2" className="popper-square" />
                    <rect x="16" y="8" width="2.2" height="2.2" className="popper-square" />
                    <rect x="13" y="2" width="1.8" height="1.8" className="popper-square" />
                </g>
            </svg>
        </div>
    );
};

const BenefitCard = ({ title, description, image, index, icon: Icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            // Sequential reveal based on index
            setTimeout(() => {
                setIsVisible(true);
            }, index * 150);
            observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`benefit-card ${isVisible ? 'visible' : ''}`}
    >
      <div className="benefit-image-wrapper">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover"
        />
      </div>
      
      <div className="benefit-content">
        {/* Icon Overlay */}
        <div className={`benefit-icon-badge ${index === 2 ? 'is-composite' : ''} ${index === 0 || index === 1 || index === 2 ? 'has-interaction' : ''}`}>
          {index === 2 ? (
            <div className="composite-icon-row">
              <User size={40} strokeWidth={1.2} />
              <HeartInteraction />
              <User size={40} strokeWidth={1.2} />
            </div>
          ) : (
            <Icon 
                size={40} 
                strokeWidth={1.2} 
                className={index === 0 ? 'popper-icon' : index === 1 ? 'camera-icon' : ''} 
            />
          )}
          {isVisible && index === 0 && <PopperGlints />}
          {isVisible && index === 1 && <CameraFlash />}
        </div>
        <h3 className="benefit-card-title font-mj2">
          {title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < title.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
        <p className="benefit-description">{description}</p>
      </div>
    </div>
  );
};

const WeddingBenefits = () => {
    const [titleVisible, setTitleVisible] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTitleVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const benefits = [
        {
            title: "기다림을 설레임으로\n로비의 활기를 더해요",  
            description: "단순히 기다리는 시간도 즐거운 추억일 될 수 있도록, 하객들이 마주하는 예식의 첫인상을 더욱 특별하게 만들어요",
            image: "/images/wedding.png",
            icon: PartyPopper
        },
        {
            title: "오늘의 행복을\n선명하게 기록해요",
            description: "신랑신부님과 하객분들의 행복한 순간을 선명하게 담아내요, 시간이 흘러 꺼내보아도 변치 않는 소중한 선물이 될 거예요",
            image: "/images/hero-wedding-01.png",
            icon: Camera
        },
        {
            title: "함께여서 더 눈부신\n우리의 오늘",
            description: "아이부터 어르신까지 세대를 넘어 다 함께 웃고 즐기는 시간을 만들어요, 한 장씩 쌓이는 사진 속에 예식의 깊은 감동을 담아드려요",
            image: "/images/hero-wedding-02.png",
            icon: User
        }
    ];

    return (
        <section className="benefits-container">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 
                    ref={titleRef}
                    className={`benefits-title text-3xl md:text-4xl font-bold text-left leading-relaxed ${titleVisible ? 'visible' : ''}`}
                    style={{ marginBottom: '35px' }}
                >
                    <span className="text-primary block text-[32px] font-normal mb-2" style={{ fontFamily: 'Weddingday' }}>
                        Special Wedding
                    </span>
                    <span className="text-3xl md:text-4xl font-mj2 font-black block">
                        포토부스를 선택하는 이유
                    </span>
                    <div className="benefits-divider"></div>
                </h2>
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <BenefitCard key={index} {...benefit} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeddingBenefits;
