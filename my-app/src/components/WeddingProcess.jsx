'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Gift, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import './WeddingProcess.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Configuration Constants (Manually Adjustable per Device) ---
const DESKTOP_CONFIG = {
  path: "M50,200 C350,200 450,80 750,80 C1050,80 1150,320 1450,320 C1750,320 1850,80 2150,80 C2450,80 2450,200 2450,200",
  viewBox: "0 0 2500 400",
  preserveAspectRatio: "xMinYMid meet"
};

const MOBILE_CONFIG = {
  // Mobile path is manually adjusted to hit all 7 steps vertically
  path: "M 200 0 C 200 150, 320 250, 200 500 S 80 750, 200 1000 S 320 1250, 200 1500 S 80 1750, 200 2000 S 320 2250, 200 2500 S 80 2750, 200 3000",
  viewBox: "0 0 400 2500", // Manually set enough height for the extended path
  preserveAspectRatio: "xMidYMin meet"
};

const stepsData = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    title: "상담 신청",
    description: "카카오톡을 통한<br/>상담 진행",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>,
    title: "장소 및 일정 확인",
    description: "베뉴 동선과<br/>스케줄 점검",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
    title: "예약금 결제",
    description: "예약금 결제 및<br/>예약 확정",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L4 2l3.5 12.5L13 18l5-5z"></path></svg>,
    title: "템플릿 선택",
    description: "우리만의<br/>맞춤 템플릿 선택",
  },
  {
    icon: <CheckCircle size={24} strokeWidth={1.5} />,
    title: "잔금 결제",
    description: "잔금 결제 및<br/>최종 일정 점검",
  },
  {
    icon: <Star size={24} strokeWidth={1.5} />,
    title: "행사 진행",
    description: "가장 빛나는 순간의<br/>행복한 촬영",
  },
  {
    icon: <Gift size={24} strokeWidth={1.5} />,
    title: "프리미엄 패키징 및<br/>포토북 제공",
    description: "신랑신부님께<br/>안전하게 전달",
  },
];

const StepItem = React.forwardRef(({ step, index, isMobile }, ref) => (
  <div ref={ref} className={isMobile ? "step-item-mobile" : "step-item-desktop"}>
    <div
      className={isMobile ? "icon-circle-mobile" : "icon-circle-desktop"}
      style={index === 5 ? { background: 'white', border: 'none', color: 'var(--primary)' } : {}}
    >
      {step.icon}
    </div>
    <span className={isMobile ? "step-badge-mobile" : "step-badge-desktop"}>STEP {index + 1}</span>
    <h3 className={isMobile ? "step-title-mobile" : "step-title-desktop"} dangerouslySetInnerHTML={{ __html: step.title }} />
    <p className={isMobile ? "step-desc-mobile" : "step-desc-desktop"} dangerouslySetInnerHTML={{ __html: step.description }} />
  </div>
));
StepItem.displayName = "StepItem";

const WeddingProcess = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const activePathRef = useRef(null);

  // Pick config based on device
  const config = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG;

  useEffect(() => {
    const activePath = activePathRef.current;
    if (!activePath) return;

    const pathLength = activePath.getTotalLength();
    gsap.set(activePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const steps = gsap.utils.toArray(isMobile ? ".step-item-mobile" : ".step-item-desktop");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? "top 65%" : "top 70%",
        toggleActions: "play none none none",
      },
    });

    const totalDuration = 5;

    tl.to(activePath, { strokeDashoffset: 0, duration: totalDuration, ease: "power2.inOut" }, 0);

    steps.forEach((step, i) => {
      tl.to(step, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        ease: "power2.out",
      }, (i / steps.length) * totalDuration);
    });

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile, config.path]); // Re-init if path changes

  return (
    <section ref={sectionRef} className={`wedding-process-section ${isMobile ? 'process-section-mobile' : 'process-section-desktop'}`}>
      <div className={isMobile ? "mobile-line-container" : "desktop-line-container"}>
        <svg
          viewBox={config.viewBox}
          preserveAspectRatio={config.preserveAspectRatio}
          className="process-svg"
        >
          <defs>
            <filter id="process-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="process-fade-grad" x1="0%" y1="0%" x2={isMobile ? "0%" : "100%"} y2={isMobile ? "100%" : "0%"}>
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="10%" stopColor="rgba(255,255,255,1)" />
              <stop offset="90%" stopColor="rgba(255,255,255,1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <mask id="process-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="url(#process-fade-grad)" />
            </mask>
          </defs>
          <path className="background-path" d={config.path} mask="url(#process-mask)" />
          <path
            ref={activePathRef}
            className="active-path"
            d={config.path}
            mask="url(#process-mask)"
            filter="url(#process-glow)"
          />
        </svg>
      </div>

      <div className={isMobile ? "steps-container-mobile" : "steps-container-desktop"}>
        {stepsData.map((step, index) => (
          <StepItem key={index} index={index} step={step} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
};

export default WeddingProcess;