'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import {
  Sun,
  Camera,
  Sliders,
  Users,
  UserCheck,
  Gem,
  BookOpen,
  PenTool,
  Archive
} from 'lucide-react';
import './WeddingDifferentiation.css';

const DiffItem = ({ title, description, points, image, reverse, index, imageClassName }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const sectionRef = useRef(null);

  // Format index as "01", "02", etc.
  const formattedNumber = String(index + 1).padStart(2, '0');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Sequential sub-reveals
          setTimeout(() => setShowImage(true), 100);
          setTimeout(() => setShowHeader(true), 500);
          setTimeout(() => setShowPoints(true), 900);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`diff-item ${reverse ? 'reverse' : ''} ${isVisible ? 'item-active' : ''}`}
    >
      <div className={`diff-visual-container ${showImage ? 'visible' : ''}`}>
        <div className="diff-visual">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover ${imageClassName || ''}`}
          />
          <div className="diff-visual-overlay"></div>
        </div>
      </div>

      <div className="diff-info">
        <div className={`diff-info-header ${showHeader ? 'visible' : ''}`}>
          {/* Decorative Number */}
          <div className="diff-number">{formattedNumber}</div>

          <h3 className="diff-title">{title}</h3>
          <p className="diff-main-desc">{description}</p>
        </div>

        <div className={`diff-points-grid ${showPoints ? 'visible' : ''}`}>
          {points.map((point, i) => (
            <div
              key={i}
              className="diff-point-card"
              style={{ transitionDelay: `${i * 0.3}s` }}
            >
              <div className="diff-point-icon">
                {point.icon}
              </div>
              <div className="diff-point-text">
                <h4 className="diff-point-title">
                  {point.text.split('&').map((part, index, arr) =>
                    index < arr.length - 1
                      ? <React.Fragment key={index}>{part}<span style={{ fontFamily: 'sans-serif' }}>&amp;</span></React.Fragment>
                      : part
                  )}
                </h4>
                <p className="diff-point-desc">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WeddingDifferentiation = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [line1Visible, setLine1Visible] = useState(false);
  const [line2Visible, setLine2Visible] = useState(false);
  const [line3Visible, setLine3Visible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          // Sequential reveal: line1 -> line2 -> line3
          setTimeout(() => setLine1Visible(true), 200);
          setTimeout(() => setLine2Visible(true), 500);
          setTimeout(() => setLine3Visible(true), 800);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (headerRef.current) observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  const items = [
    {
      title: "오늘 가장 눈부실 당신을 위한,\n무결점 빛 설계",
      description: (
        <>
          <span className="text-highlight">신랑신부님이 가장 아름다운 찰나</span>를 기록해요
        </>
      ),
      points: [
        {
          icon: <Sun size={20} />,
          text: "시그니처 화이트 조명",
          desc: "피부 결은 살리고 톤은 화사하게 보정하는 프리미엄 광질로, 보정 없이도 완벽한 결과물을 선사해요"
        },
        {
          icon: <Camera size={20} />,
          text: "Full-Frame DSLR",
          desc: "초고해상도 센서로 눈동자의 생생함까지 담아내는 압도적인 선명도를 구현해요"
        },
        {
          icon: <Sliders size={20} />,
          text: "베뉴 맞춤 컬러 튜닝",
          desc: "식장의 분위기와 조명 색온도에 최적화된 후보정 프로세스를 적용해요"
        }
      ],
      image: "/images/bright.png",
      imageClassName: "object-top-10"
    },
    {
      title: "예식의 품격을 완성하는,\n2인 전담 매니저",
      description: <>정중한 매너와 전문 교육을 이수한 전문 매니저가 <span className="text-highlight">하객 한 분 한 분을 극진히 모셔요</span></>,
      points: [
        {
          icon: <Users size={20} />,
          text: "여유로운 동선 관리",
          desc: "혼잡한 예식 당일, 하객분들이 불편함 없이 즐기실 수 있도록 최적의 동선을 미리 파악하여, 매끄럽게 안내해요"
        },
        {
          icon: <UserCheck size={20} />,
          text: "포즈&무드 가이드",
          desc: "카메라 앞이 낯선 하객분들도 모델처럼 환하게 웃을 수 있도록 자연스럽고 유쾌하게 리드해드려요"
        },
        {
          icon: <Gem size={20} />,
          text: "격식있는 하객 환대",
          desc: "예식에 어울리는 단정한 복장과 정중한 매너로, 신랑·신부님의 소중한 손님들께 기분 좋은 첫인상을 선사해요"
        }
      ],
      image: "/images/promo-wedding.png",
      reverse: true
    },
    {
      title: "다시 열어볼 때마다\n전해지는 진심",
      description: (
        <>
          축의금 봉투에 다 담지 못한 <br className="mobile-br" />
          하객들의 소중한 진심을 한 권에 담아드려요 <br className="mobile-br" />
          <span className="text-highlight">평생 꺼내 볼 수 있는 특별한 기록이에요</span>
        </>
      ),
      points: [
        {
          icon: <BookOpen size={20} />,
          text: "마음까지 담은 포토북",
          desc: "하객분들의오랜 시간이 흘러도 처음의 감동이 변치 않도록, 한 페이지 한 페이지 정성으로 제작해요"
        },
        {
          icon: <PenTool size={20} />,
          text: "견고한 핸드메이드 바인딩",
          desc: "오랜 시간이 흘러도 변하지 않도록 튼튼하게 제작하여, 오래 간직할 수 있도록 가치를 더해요"
        },
        {
          icon: <Archive size={20} />,
          text: "프리미엄 전용 보관함",
          desc: "소중한 추억에 먼지가 쌓이지 않도록, 고급스러운 전용 보관함에 담아 안전하고 품격있게 전달드려요"
        }
      ],
      image: "/images/gift.png"
    }
  ];

  return (
    <section className="diff-section">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2
          ref={headerRef}
          className={`benefits-title text-3xl md:text-4xl font-bold text-left leading-relaxed ${headerVisible ? 'visible' : ''}`}
        >
          <span className="text-primary block text-[32px] font-normal mb-2" style={{ fontFamily: 'Weddingday' }}>
            Our Benefit
          </span>
          <span className="text-3xl md:text-4xl font-mj2 font-black block">
            <span className={`diff-title-line ${line1Visible ? 'visible' : ''}`}><span style={{ fontFamily: "'Prata', serif", fontWeight: 'bold', letterSpacing: '0.05em' }}>VUE PHOTOBUTH</span>는</span>
            <br />
            <span className={`diff-title-line ${line2Visible ? 'visible' : ''}`}>퀄리티 높은 기술에 정성을 담아,</span>
            <br />
            <span className={`diff-title-line ${line3Visible ? 'visible' : ''}`}>가장 완벽한 서비스를 제공해드려요</span>
          </span>
          <div className="benefits-divider"></div>
        </h2>

        <div className="diff-items">
          {items.map((item, index) => (
            <DiffItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingDifferentiation;
