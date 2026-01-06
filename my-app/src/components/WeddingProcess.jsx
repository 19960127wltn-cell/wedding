'use client';
import React, { useEffect, useRef, useState } from 'react'; // Added useState
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Gift, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWindowWidth } from '@/hooks/use-window-width'; // Import useWindowWidth
import './WeddingProcess.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ORIGINAL_REF_PATH_D = "M 200 0 C 200 150, 320 250, 200 500 S 80 750, 200 1000 S 320 1250, 200 1500 S 80 1750, 200 2000";
const ORIGINAL_REF_MAX_Y = 2000;
const ORIGINAL_REF_VIEWBOX_HEIGHT = 2200; // Reference viewBox height where ORIGINAL_REF_MAX_Y is the max y value

// Helper function to scale path D
const scalePathD = (originalD, originalMaxY, newMaxY) => {
  const scaleFactor = newMaxY / originalMaxY;
  const pathParts = originalD.split(/(?=[MCLSQ])/).filter(Boolean); // Split by path commands

  return pathParts.map(part => {
    const command = part[0];
    const coords = part.substring(1).trim().split(/[\s,]+/).map(Number);
    
    // Scale only Y coordinates
    const scaledCoords = coords.map((coord, index) => {
      if (index % 2 !== 0) { // Y coordinates are at odd indices (0-indexed x,y pairs)
        return coord * scaleFactor;
      }
      return coord;
    });
    return command + scaledCoords.join(' ');
  }).join(' ');
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
    icon: <CheckCircle size={24} strokeWidth={1.5} />, // Changed icon for step 5
    title: "잔금 결제",
    description: "잔금 결제 및<br/>최종 일정 점검",
  },
  {
    icon: <Star size={24} strokeWidth={1.5} color="white" />, // Explicitly set color to white
    title: "행사 진행",
    description: "가장 빛나는 순간의<br/>행복한 촬영",
  },
  {
    icon: <Gift size={24} strokeWidth={1.5} />, // Changed icon for step 7
    title: "프리미엄 패키징 및<br/>포토북 제공",
    description: "신랑신부님께<br/>안전하게 전달",
  },
];

// Desktop step component
const DesktopStepNode = ({ index, step, isVisible }) => (
  <div className={`step-node-desktop ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 150}ms`}}>
    <div className="icon-circle-desktop" style={index === 5 ? { background: 'var(--primary)', border: 'none', color: 'white' } : {}}>
      {step.icon}
    </div>
    <div className="step-content-desktop">
      <span className="number-badge-desktop">STEP {index + 1}</span>
      <b dangerouslySetInnerHTML={{ __html: step.title }} />
      <p dangerouslySetInnerHTML={{ __html: step.description }} />
    </div>
  </div>
);

// Mobile step component
const MobileStepItem = React.forwardRef(({ step, index }, ref) => (
  <div ref={ref} className="step-item-mobile">
    <div className="icon-circle-mobile" style={index === 5 ? { background: 'white', border: 'none', color: 'var(--primary)' } : {}}>
        {step.icon}
    </div>
    <span className="step-badge-mobile">STEP {index + 1}</span>
    <h3 className="step-title-mobile" dangerouslySetInnerHTML={{ __html: step.title }} />
    <p className="step-desc-mobile" dangerouslySetInnerHTML={{ __html: step.description }} />
  </div>
));
MobileStepItem.displayName = "MobileStepItem";


const WeddingProcess = () => {
  const isMobile = useIsMobile();
  const windowWidth = useWindowWidth(); // Use the new hook
  const sectionRef = useRef(null);
  // pathRef is no longer needed for desktop because path d is hardcoded now
  // const pathRef = useRef(null); // Removed pathRef
  
  const [mobilePathD, setMobilePathD] = useState(ORIGINAL_REF_PATH_D);
  const [mobileViewBoxHeight, setMobileViewBoxHeight] = useState(ORIGINAL_REF_VIEWBOX_HEIGHT);


  useEffect(() => {
    if (isMobile) { // Only run for mobile
      let newViewBoxHeight = ORIGINAL_REF_VIEWBOX_HEIGHT; // Default
      let newMaxY = ORIGINAL_REF_MAX_Y;

      if (windowWidth <= 370) {
        newViewBoxHeight = 2800;
        newMaxY = 2700; // Corresponds to viewBoxHeight - 100 for padding
      } else if (windowWidth >= 371 && windowWidth <= 500) {
        newViewBoxHeight = 2200;
        newMaxY = 2100; // Corresponds to viewBoxHeight - 100 for padding
      }
      // Add more conditions if necessary for other breakpoints later

      // Ensure newMaxY is never 0 to avoid division by zero
      if (ORIGINAL_REF_MAX_Y > 0) {
          const scaledD = scalePathD(ORIGINAL_REF_PATH_D, ORIGINAL_REF_MAX_Y, newMaxY);
          setMobilePathD(scaledD);
      }
      setMobileViewBoxHeight(newViewBoxHeight);
    }
  }, [isMobile, windowWidth]); // Re-run when mobile state or window width changes

  // Desktop animation logic (using GSAP ScrollTrigger)
  useEffect(() => {
    if (isMobile === false) { 
      const desktopBackgroundPath = document.querySelector("#background-step-path-desktop");
      const desktopActivePath = document.querySelector("#active-step-path-desktop");
      if (!desktopBackgroundPath || !desktopActivePath) return;

      const pathLength = desktopActivePath.getTotalLength();
      gsap.set(desktopActivePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".process-section-desktop", // Trigger on desktop section
          start: "top center", // Adjust start position as needed
          toggleActions: "play none none none",
        },
      });

      const totalDuration = 3; // Similar duration to mobile, adjust if needed

      // Animate main path drawing
      tl.to(desktopActivePath, { strokeDashoffset: 0, duration: totalDuration, ease: "power2.inOut" }, 0);
      
      return () => {
        if (tl) tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, [isMobile]); // Re-run when mobile state changes

  // Mobile GSAP animation logic
  useEffect(() => {
    if (isMobile) {
      const steps = gsap.utils.toArray(".step-item-mobile");
      const backgroundPath = document.querySelector("#background-step-path");
      const activePath = document.querySelector("#active-step-path");
      // Removed sheenPath selection
      if (!steps.length || !backgroundPath || !activePath) return; // Modified
      
      // Since pathD can change, we need to get the length AFTER the component has rendered with the new pathD
      // This useEffect will re-run on mobilePathD change, so activePath will reflect the new D
      const pathLength = activePath.getTotalLength(); 
      gsap.set(activePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      
      // Removed sheenLength and gsap.set(sheenPath...)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".process-section-mobile",
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      const totalDuration = 5; 

      // Animate main path drawing
      tl.to(activePath, { strokeDashoffset: 0, duration: totalDuration, ease: "power2.inOut" }, 0);
      
      // Removed sheen path animation
      // tl.to(sheenPath, { strokeDashoffset: -sheenLength, duration: totalDuration * 0.95, ease: "sine.inOut" }, 0.1);

      // Animate steps appearing at staggered times
      steps.forEach((step, i) => {
        tl.to(step, {
          opacity: 1,
          y: 0,
          duration: 1, 
          ease: "power2.out", 
        }, (i / steps.length) * totalDuration); 
      });
      
      return () => {
        if (tl) tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, [isMobile, mobilePathD]); // Re-run GSAP on pathD change
  
  return (
    <section ref={sectionRef} className={`wedding-process-section ${isMobile ? 'process-section-mobile' : 'process-section-desktop'}`}>
      {isMobile ? (
        // Mobile View with GSAP
        <React.Fragment>
          <div className="mobile-line-container">
              <svg viewBox={`0 0 400 ${mobileViewBoxHeight}`} preserveAspectRatio="xMidYMin meet">
                  <defs>
                      <filter id="process-glow-mobile" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      
                      {/* Mask for fading ends */}
                      <linearGradient id="process-fade-grad-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                          <stop offset="10%" stopColor="rgba(255,255,255,1)" />
                          <stop offset="90%" stopColor="rgba(255,255,255,1)" />
                          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>

                      <mask id="process-mask-mobile">
                          <rect x="0" y="0" width="100%" height="100%" fill="url(#process-fade-grad-mobile)" />
                      </mask>
                  </defs>

                  <path id="background-step-path" d={mobilePathD} mask="url(#process-mask-mobile)" />
                  <path id="active-step-path" d={mobilePathD} mask="url(#process-mask-mobile)" filter="url(#process-glow-mobile)" />
              </svg>
          </div>
          {stepsData.map((step, index) => (
            <MobileStepItem key={index} index={index} step={step} />
          ))}
        </React.Fragment>
      ) : (
        // Desktop View (pre-existing logic)
        <div className="road-container-desktop">
            <svg className="road-svg-desktop" preserveAspectRatio="none">
              <defs>
                <filter id="process-glow-desktop" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                <linearGradient id="process-fade-grad-desktop" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="10%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="90%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>

                <mask id="process-mask-desktop">
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#process-fade-grad-desktop)" />
                </mask>
              </defs>
              <path 
                id="background-step-path-desktop" 
                d="M0,100 C150,100 250,150 400,150 C550,150 650,50 800,50 C950,50 1050,100 1200,100" 
                className="road-path-desktop-track" 
                mask="url(#process-mask-desktop)" 
              />
              <path 
                id="active-step-path-desktop" 
                d="M0,100 C150,100 250,150 400,150 C550,150 650,50 800,50 C950,50 1050,100 1200,100" 
                className="road-path-desktop-progress" 
                mask="url(#process-mask-desktop)" 
                filter="url(#process-glow-desktop)" 
              />
            </svg>
          {stepsData.map((step, index) => (
            <DesktopStepNode key={index} index={index} step={step} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WeddingProcess;