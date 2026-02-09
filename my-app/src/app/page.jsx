'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import FadeInOnScroll from '../components/FadeInOnScroll';
import StaggeredTextReveal from '../components/StaggeredTextReveal';
import HandwritingText from '../components/HandwritingText';
import HomeNotice from '../components/HomeNotice'; // Import HomeNotice
import { useWindowWidth } from '../hooks/use-window-width'; // Import useWindowWidth hook

export default function MainPage() {
  const [showDimOverlay, setShowDimOverlay] = useState(false);
  const [showHandwritingText, setShowHandwritingText] = useState(false);
  const windowWidth = useWindowWidth(); // Use the hook
  const isSmallMobile = windowWidth > 0 && windowWidth <= 500; // Define condition

  const [isNoticeOpen, setIsNoticeOpen] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Auto-play failed:", error);
      });
    }
  }, [videoRef]);

  useEffect(() => {
    const dimTimer = setTimeout(() => {
      setShowDimOverlay(true);
    }, 10);
    return () => clearTimeout(dimTimer);
  }, []);

  useEffect(() => {
    if (isNoticeOpen) return; // Wait for notice to close

    const handwritingStartDelay = 1500;
    const timer = setTimeout(() => {
      setShowHandwritingText(true);
    }, handwritingStartDelay);
    return () => clearTimeout(timer);
  }, [isNoticeOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <HomeNotice onOpenChange={(open) => setIsNoticeOpen(open)} /> {/* Track notice close */}
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center text-center overflow-hidden pt-24 md:pt-32">
        {/* Background Image and Dimming */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/images/main/기기+포스터+신랑신부.mp4" type="video/mp4" />
          </video>
          {/* Dimming Overlay */}
          <div className={`absolute inset-0 bg-black z-10 transition-opacity duration-500 ${showDimOverlay ? 'opacity-30' : 'opacity-0'}`}></div>
        </div>

        {/* Main Content Area (Text) */}
        {!isNoticeOpen && ( // Only show content after notice is closed
          <FadeInOnScroll className="relative z-20 p-4 flex flex-col items-center justify-center font-mj2 text-[30px] lg:text-[50px] text-white min-h-[300px] -mt-10">
            <StaggeredTextReveal
              phrases={["가장 소중한 날", "그날의 행복을 담아드려요"]}
              className="text-lg md:text-2xl mb-4"
              delayPerPhrase={1000}
              isSmallMobile={isSmallMobile} // Pass the prop
            />
            {/* 4. Render HandwritingText component with internal control */}
            <HandwritingText className="mt-4" animate={showHandwritingText} isSmallMobile={isSmallMobile} />
          </FadeInOnScroll>
        )}
      </section>

      {/* "어떤 순간이든, 완벽하게" section */}
      <section className="pt-16 md:pt-24 pb-0 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <FadeInOnScroll>
          <p className="font-mj2 text-[22px] md:text-3xl lg:text-4xl text-foreground">
            모든 순간을, 완벽하게
          </p>
        </FadeInOnScroll>
      </section>

      {/* Promotional Blocks Section */}
      <section className="pt-8 pb-0 md:py-12 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Wedding Service Block */}
          <FadeInOnScroll className="flex-1 delay-200">
            <div className="relative bg-card shadow-xl rounded-lg overflow-hidden group">
              <Link href="/wedding" passHref>
                <div className="relative w-full h-80 md:h-96 overflow-hidden">
                  <Image
                    src="/images/promo-wedding.png"
                    alt="Wedding Photo Buth Service"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/75 text-zinc-800 z-10">
                    <h3 className="font-gnb text-2xl mb-2">Wedding</h3>
                    <p className="font-mj2 text-base">일생의 한번 뿐인 소중한 순간을<br />가장 아름답게 기록해보세요</p>
                  </div>
                </div>
              </Link>
            </div>
          </FadeInOnScroll>

          {/* Popup/Event Service Block */}
          <FadeInOnScroll className="flex-1 delay-500">
            <div className="relative bg-card shadow-xl rounded-lg overflow-hidden group">
              <Link href="/popup-event" passHref>
                <div className="relative w-full h-80 md:h-96 overflow-hidden">
                  <Image
                    src="/images/promo-event.png"
                    alt="Popup and Event Photo Buth"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/75 text-zinc-800 z-10">
                    <h3 className="font-gnb text-2xl mb-2">POPUP</h3>
                    <p className="font-mj2 text-base">브랜드 런칭, 기업 행사 등<br />모든 이벤트에 특별함을 더해드려요</p>
                  </div>
                </div>
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>


    </div>
  );
}