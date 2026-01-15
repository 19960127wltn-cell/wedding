'use client';

import React from 'react';
import Image from 'next/image';
import StaggeredTextReveal from './StaggeredTextReveal';
import './PopupHero.css';

const PopupHero = () => {
    return (
        <section className="popup-hero">
            <div className="popup-hero-bg">
                <Image
                    src="/images/event01.png"
                    alt="Popup & Event Hero Background"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="popup-hero-overlay"></div>
            </div>

            <div className="popup-hero-content max-w-7xl mx-auto px-6 md:px-8">
                <div className="popup-hero-text-wrapper">
                    <h1 className="popup-hero-title opacity-0 animate-[fadeInDown_1.2s_ease-out_forwards]">
                        Popup <span className="font-mj2">/</span> Event
                    </h1>

                    <div className="popup-hero-divider opacity-0 animate-[scaleIn_1s_ease-out_0.5s_forwards]"></div>

                    <StaggeredTextReveal
                        phrases={[
                            "정성을 다해 준비하신 행사가",
                            "소중한 기억으로 남을 수 있도록,",
                            "진심이 담긴 특별한 경험을 선사합니다."
                        ]}
                        className="popup-hero-description"
                        delayPerPhrase={800}
                    />
                </div>
            </div>

            <div className="popup-hero-scroll-indicator">
                <div className="scroll-lane">
                    <div className="scroll-dot"></div>
                </div>
            </div>
        </section>
    );
};

export default PopupHero;
