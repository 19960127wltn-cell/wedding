'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './WeddingReview.css';

const reviews = [
    { id: 1, title: '정말 꿈만 같은 결혼식이었어요. 포토부스 덕분에 분위기가 한층 살았습니다!', image: '/images/bright.png' },
    { id: 2, title: '하객분들이 너무 좋아하셔서 뿌듯했습니다. 디자인도 너무 예뻐요.', image: '/images/hero-wedding.png' },
    { id: 3, title: 'VUE 포토부스 선택하길 정말 잘한 것 같아요. 상담도 친절하셨습니다.', image: '/images/bright.png' },
    { id: 4, title: '사진 퀄리티가 너무 좋아서 놀랐습니다. 인화지도 고급스러워요.', image: '/images/hero-wedding.png' },
    { id: 5, title: '특별한 날을 더 특별하게 만들어주셔서 감사합니다.', image: '/images/bright.png' },
];

const WeddingReview = () => {
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef(null);

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

    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="wedding-review-section">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <h2
                    ref={headerRef}
                    className={`benefits-title text-3xl md:text-4xl font-bold text-left leading-relaxed ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="text-primary block text-[32px] font-normal mb-2" style={{ fontFamily: 'Weddingday' }}>
                        Review
                    </span>
                    <span className="text-3xl md:text-4xl font-mj2 font-black block">
                        고객님들의 리뷰를 확인해보세요
                    </span>
                    <div className="benefits-divider"></div>
                </h2>

                <div className="reviews-slider-container relative">
                    <button onClick={scrollLeft} className="slider-nav-btn prev" aria-label="Previous slide">
                        <ChevronLeft size={24} />
                    </button>

                    <div className="reviews-flex-track" ref={sliderRef}>
                        {reviews.map((review) => (
                            <a
                                key={review.id}
                                href="https://blog.naver.com/vuephotobooth"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="review-item-card"
                            >
                                <div className="review-image-wrapper">
                                    <Image
                                        src={review.image}
                                        alt={review.title}
                                        fill
                                        className="review-image"
                                    />
                                    <div className="review-overlay">
                                        <div className="review-overlay-content">
                                            <p className="review-title-text font-mj2">{`"${review.title}"`}</p>
                                            <span className="review-detail-link font-mj2">리뷰 상세 &gt;</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <button onClick={scrollRight} className="slider-nav-btn next" aria-label="Next slide">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WeddingReview;
