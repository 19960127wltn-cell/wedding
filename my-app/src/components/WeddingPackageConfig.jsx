'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  Clock, Users, Wrench, Camera, Printer, Sparkles, Monitor, Book, Lightbulb, Table, Megaphone,
  QrCode, Image, Layers, Package, Feather, Download, Film, // More icons as needed
} from 'lucide-react';
import './WeddingPackageConfig.css';

const MixedFontText = ({ text }) => {
  if (!text) return null;

  const nonKoreanRegex = /[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~*]+/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = nonKoreanRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(<span key={lastIndex} className="font-sans">{match[0]}</span>);
    lastIndex = nonKoreanRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
};

const packageItems = [
  { icon: Clock, text: "이용시간 90분" },
  { icon: Users, text: "스태프 2인" },
  { icon: Wrench, text: "설치 및 철수" },
  { icon: Camera, text: "촬영 소품 제공" },
  { icon: Printer, text: "무제한 인쇄" },
  { icon: Sparkles, text: "뷰티 필터" },
  { icon: Monitor, text: "초대형 모니터" },
  { icon: Camera, text: "DSLR 카메라\n(2410만 화소)" },
  { icon: Book, text: "고급 방명록지" },
  { icon: Lightbulb, text: "6400k 조명" },
  { icon: Table, text: "테이블 제공" },
  { icon: Megaphone, text: "안내배너" },
  { icon: QrCode, text: "QR제공\n(요청 시)" },
  { icon: Image, text: "액자 서비스" },
  { icon: Layers, text: "2~4컷 선택" },
  { icon: Package, text: "고급 바인더\n박스" },
  { icon: Feather, text: "화이트 쉬폰\n백월&가랜드" },
  { icon: Download, text: "촬영 사진 원본\n(요청 시)" },
  { icon: Film, text: "OPP 필름\n무제한" },
];

const WeddingPackageConfig = () => {
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

  return (
    <section className="package-config-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          ref={headerRef}
          className={`benefits-title text-3xl md:text-4xl font-bold text-left leading-relaxed ${headerVisible ? 'visible' : ''}`}
          style={{ marginBottom: '35px' }}
        >
          <span className="text-primary block text-[32px] font-normal mb-2" style={{ fontFamily: 'Weddingday' }}>
            Option
          </span>
          <span className="text-3xl md:text-4xl font-mj2 font-black block">
            패키지 구성
          </span>
          <div className="benefits-divider"></div>
        </h2>

        <div className="package-items-grid">
          {packageItems.map((item, index) => (
            <div key={index} className="package-item">
              <div className="package-item-icon">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <p className="package-item-text">
                {item.text.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    <MixedFontText text={line} />
                    {i < arr.length - 1 && <br className="mobile-only-break" />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingPackageConfig;
