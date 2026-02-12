'use client';

import React from 'react';
import Image from 'next/image';
import FadeInOnScroll from '@/components/shared/FadeInOnScroll';

const dayProcessSteps = [
  {
    title: "Step 01",
    description: "예식 시작 60분 전 설치 완료",
    image: "/images/wedding/day-process-1.png"
  },
  {
    title: "Step 02",
    description: "하객 응대 및 서비스 진행",
    image: "/images/wedding/day-process-2.png"
  },
  {
    title: "Step 03",
    description: "예식 종료 후 기기 철수",
    image: "/images/wedding/day-process-3.png"
  },
  {
    title: "Step 04",
    description: "신랑신부님께 포토북 전달",
    image: "/images/wedding/day-process-4.png"
  }
];

export default function WeddingDayProcess() {
  const [titleVisible, setTitleVisible] = React.useState(false);
  const titleRef = React.useRef(null);

  React.useEffect(() => {
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

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2
          ref={titleRef}
          className={`benefits-title text-3xl md:text-4xl font-bold text-left leading-relaxed ${titleVisible ? 'visible' : ''}`}
          style={{ marginBottom: '35px' }}
        >
          <span className="text-primary block text-[32px] font-normal mb-2" style={{ fontFamily: 'Weddingday' }}>
            Wedding Day
          </span>
          <span className="text-3xl md:text-4xl font-mj2 font-black block">
            예식 당일, 가장 설레는 시작부터<br />
            마무리까지 함께해요
          </span>
          <div className="benefits-divider"></div>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dayProcessSteps.map((step, index) => (
            <FadeInOnScroll key={index} className={`delay-${(index + 1) * 50}`}>
              <div className="group bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 border border-zinc-100/50">
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-5">
                  <Image
                    src={step.image}
                    alt={step.description}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-2 pb-2 space-y-1.5">
                  <span className="font-gnb text-primary text-[11px] tracking-widest uppercase font-bold">
                    {step.title}
                  </span>
                  <h4 className="font-mj2 text-[17px] md:text-[18px] font-bold text-foreground leading-snug break-keep">
                    {step.description}
                  </h4>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
