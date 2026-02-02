"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  HandHelping,
  PenTool,
  UserCheck,
  FileBarChart,
  X,
  ArrowRight,
  Plus,
  MessageCircle,
  PhoneCall,
  Instagram
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./PopupService.css";

const portfolioItems = [
  {
    id: 1,
    category: "IT GLOBAL CONFERENCE",
    title: "글로벌 테크 기업 컨퍼런스",
    desc: "전담 매니저 2인 배치, 기업 로고 커스텀 프레임 4종 운영",
    review:
      "장비의 고급스러움은 물론이고, 매니저님들의 의전 매너가 훌륭해서 VIP 분들이 매우 만족하셨습니다.",
    reviewer: "행사 기획 담당 이OO 대리",
    image: "/images/bright.png",
  },
  {
    id: 2,
    category: "GOVERNMENT EVENT",
    title: "공공기관 비전 선포식",
    desc: "대규모 인원 수용을 위한 초고속 출력 모드 적용",
    review:
      "줄이 길었는데도 빠른 회전율 덕분에 민원 없이 성공적으로 마무리되었습니다. 데이터 관리도 철저해서 안심이 됐습니다.",
    reviewer: "운영팀 총괄 박OO 과장",
    image: "/images/hero-wedding.png",
  },
];

const brandLogos = [
  "01_samsung.png",
  "02_hyundai_motor.png",
  "03_sk.png",
  "04_lotte.png",
  "05_posco.png",
  "07_hanwha.png",
  "08_gs.png",
  "09_hyundai_heavy.png",
  "10_nonghyup.png",
];

const qualityFeatures = [
  {
    id: "q1",
    title: "스튜디오급 광학 시스템",
    desc: "고성능 DSLR과 정교한 조명 세팅으로 어떤 장소에서도 무결점 결과물을 만듭니다. 화사함과 깊이감을 동시에 잡는 VUE만의 노하우입니다.",
    image: "/images/popup/DSLR.png"
  },
  {
    id: "q2",
    title: "10초 완성 프리미엄 인화",
    desc: "대규모 인원도 대기 없이 즐길 수 있는 초고속 시스템과 선명한 프리미엄 인화지를 사용합니다.",
    image: "/images/popup/print1.png"
  },
  {
    id: "q3",
    title: "스마트 QR 디지털 솔루션",
    desc: "QR코드를 통해 촬영본 파일(사진/GIF)을 즉시 스마트폰으로 전송합니다. 간편한 SNS 공유를 유도하여 기업의 마케팅 확산 효과를 극대화합니다.",
    image: "/images/popup/QR.png"
  }
];

const referenceCategories = [
  {
    id: 'corp',
    title: '기업 행사',
    subtitle: 'CORPORATE EVENTS',
    count: '48 Cases',
    image: '/images/event01.png',
    desc: '삼성, 현대, SK 등 국내 주요 대기업의 사내 행사 및 연말 파티를 완벽하게 수행했습니다.'
  },
  {
    id: 'popup',
    title: '팝업 스토어',
    subtitle: 'POP-UP STORES',
    count: '32 Projects',
    image: '/images/popup01.png',
    desc: '브랜드의 아이덴티티를 체험할 수 있는 감각적인 포토부스 솔루션을 제공합니다.'
  },
  {
    id: 'public',
    title: '공공기관',
    subtitle: 'PUBLIC & GOV',
    count: '25 Projects',
    image: '/images/hall01.png',
    desc: '시민들이 참여하는 공공 축제와 행사에 안정적이고 즐거운 경험을 더합니다.'
  },
  {
    id: 'school',
    title: '대학교/학교',
    subtitle: 'CAMPUS & SCHOOL',
    count: '50+ Events',
    image: '/images/event02.png',
    desc: '축제와 입학/졸업식 등 학교 행사에서 학생들의 소중한 추억을 남깁니다.'
  }
];

const PopupServiceContent = () => {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [selectedRef, setSelectedRef] = useState(null);
  const [activeQualityIndex, setActiveQualityIndex] = useState(0);
  const qualitySectionRef = useRef(null);

  // Quality Sticky Scroll Observer
  useEffect(() => {
    const section = qualitySectionRef.current;
    if (!section) return;

    const options = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when element is near center of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index)) {
            setActiveQualityIndex(index);
          }
        }
      });
    }, options);

    const textItems = section.querySelectorAll(".quality-text-item");
    textItems.forEach((item) => observer.observe(item));

    return () => {
      textItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px", /* Trigger when 10% from the bottom of viewport */
      threshold: 0.05, /* Low threshold for earlier triggering */
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll, .trigger-animation");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="popup-service-wrapper">


      {/* 1. Our Identity */}
      <section className="promise-section px-6 md:px-8">
        <div className="popup-content-inner">
          <div className="animate-on-scroll">
            <span
              className="section-label"
            >
              Our Identity
            </span>
            <h2 className="section-tit">
              VUE PHOTOBOOTH는
              <br />
              타협하지 않는 전문성으로 운영합니다.
            </h2>
          </div>
          <div className="promise-grid animate-on-scroll" style={{ transitionDelay: "0.5s" }}>
            <div className="promise-item">
              <div className="promise-icon-box">
                <ShieldCheck size={40} strokeWidth={1.2} />
              </div>
              <h3>직접 운영의 원칙</h3>
              <div className="promise-divider"></div>
              <p>
                전문 교육을 받은 전담 매니저가 상주하여, 행사의 시작과 끝을 완벽히 책임집니다.
              </p>
              <div className="border-trace-container">
                <svg className="border-trace-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Inline rect: x=0.5, y=0.5, width=99, height=99 ensures stroke 1.5px stays inside */}
                  <rect x="0.5" y="0.5" width="99" height="99" rx="14" ry="11" className="border-rect" />
                </svg>
              </div>
            </div>
            <div className="promise-item">
              <div className="promise-icon-box">
                <Award size={40} strokeWidth={1.2} />
              </div>
              <h3>무결점 현장 매너</h3>
              <div className="promise-divider"></div>
              <p>
                단순 설치를 넘어, 기업 행사의 비즈니스 에티켓을 준수하여 정중하게 응대합니다.
              </p>
              <div className="border-trace-container">
                <svg className="border-trace-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Inline rect: x=0.5, y=0.5, width=99, height=99 ensures stroke 1.5px stays inside */}
                  <rect x="0.5" y="0.5" width="99" height="99" rx="14" ry="11" className="border-rect" />
                </svg>
              </div>
            </div>
            <div className="promise-item">
              <div className="promise-icon-box">
                <HandHelping size={40} strokeWidth={1.2} />
              </div>
              <h3>철저한 리스크 관리</h3>
              <div className="promise-divider"></div>
              <p>
                보이지 않는 현장의 변수까지 세심하게 체크하여 안정적인 행사 진행을 약속합니다.
              </p>
              <div className="border-trace-container">
                <svg className="border-trace-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Inline rect: x=0.5, y=0.5, width=99, height=99 ensures stroke 1.5px stays inside */}
                  <rect x="0.5" y="0.5" width="99" height="99" rx="14" ry="11" className="border-rect" />
                </svg>
              </div>
            </div>
          </div>

          {/* Brand Social Proof - Logo Rolling */}
          <div className="identity-logo-rolling animate-on-scroll">
            <p className="identity-logo-label">
              수많은 경험으로 <em>증명합니다.</em>
            </p>
            <div className="logo-rolling-container">
              <div className="logo-trail">
                {[...brandLogos, ...brandLogos].map((logo, index) => (
                  <div key={index} className="logo-item">
                    <div className="brand-logo-wrap">
                      <Image
                        src={`/images/brand/${logo}`}
                        alt="Brand Logo"
                        width={180}
                        height={60}
                        className="brand-logo-img"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="brand-view-all-wrap animate-on-scroll">
              <button
                className="brand-view-all-btn"
                onClick={() => setIsBrandModalOpen(true)}
              >
                전체보기
              </button>
            </div>
          </div>
        </div>

        {/* Brand Full List Dialog */}
        {isBrandModalOpen && (
          <div className="brand-modal-overlay" onClick={() => setIsBrandModalOpen(false)}>
            <div className="brand-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="brand-modal-close" onClick={() => setIsBrandModalOpen(false)}>
                <X size={24} />
              </button>
              <ScrollArea className="brand-modal-scroll-area">
                <div className="brand-modal-inner">
                  <div className="brand-modal-header">
                    <span className="section-label">Our Partners</span>
                    <h3 className="brand-modal-title">수많은 기업이 증명하는 VUE의 가치</h3>
                  </div>
                  <div className="brand-modal-grid">
                    {brandLogos.map((logo, index) => (
                      <div key={index} className="brand-modal-item">
                        <div className="modal-logo-wrap">
                          <Image
                            src={`/images/brand/${logo}`}
                            alt="Brand Logo"
                            fill
                            className="modal-logo-img balance-logo"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </section>

      {/* 2. Service Appeal */}
      <section className="section-appeal">
        <div className="popup-content-inner">
          <div className="appeal-header text-center mb-12 animate-on-scroll">
            <span className="section-label">Service Value</span>
            <h2 className="section-tit">
              단순한 설치를 넘어,
              <br />
              현장의 분위기를 설계합니다.
            </h2>
          </div>

          <div className="appeal-cross-container">
            {/* Appeal 01 - Cross Left/Right */}
            <div className="appeal-cross-row trigger-animation">
              <div className="appeal-cross-visual slide-from-left">
                <div className="appeal-cross-card aspect-[16/10]">
                  <Image
                    src="/images/popup/obje.png"
                    alt="Minimal Design"
                    fill
                    className="object-cover obje-image-pos"
                  />
                  <div className="appeal-card-overlay"></div>
                </div>
              </div>
              <div className="appeal-cross-content slide-from-right">
                <div className="appeal-cross-text">
                  <div className="appeal-cross-num">01</div>
                  <h3>
                    공간의 가치를 높이는
                    <br />
                    오브제 디자인
                  </h3>
                  <p>
                    어떤 행사장 인테리어와도 조화롭게 어우러지는 기기 디자인으로
                    <br className="desktop-br" /> 공간의 첫인상을 전문적이고 세련되게 바꿉니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Appeal 02 - Cross Layout (Standardized alignment) */}
            <div className="appeal-cross-row trigger-animation">
              <div className="appeal-cross-visual slide-from-left">
                <div className="appeal-cross-card aspect-[16/10]">
                  <Image
                    src="/images/popup/join.png"
                    alt="Social Tool"
                    fill
                    className="object-cover"
                  />
                  <div className="appeal-card-overlay"></div>
                </div>
              </div>
              <div className="appeal-cross-content slide-from-right">
                <div className="appeal-cross-text">
                  <div className="appeal-cross-num">02</div>
                  <h3>
                    보기만 하는 행사에서,
                    <br />
                    참여하고 싶은 경험으로
                  </h3>
                  <p>
                    참여자들이 자연스럽게 소통하고 즐길 수 있는 접점을 만듭니다.
                    <br className="desktop-br" /> 현장의 에너지를 끌어올리는 가장 확실한 마케팅입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Appeal 03 - Cross Left/Right */}
            <div className="appeal-cross-row trigger-animation">
              <div className="appeal-cross-visual slide-from-left">
                <div className="appeal-cross-card aspect-[16/10]">
                  <Image
                    src="/images/popup/end.png"
                    alt="Brand Experience"
                    fill
                    className="object-cover"
                  />
                  <div className="appeal-card-overlay"></div>
                </div>
              </div>
              <div className="appeal-cross-content slide-from-right">
                <div className="appeal-cross-text">
                  <div className="appeal-cross-num">03</div>
                  <h3>
                    브랜드 가치의
                    <br />
                    지속적인 공유
                  </h3>
                  <p>
                    손에 든 사진 한 장이 행사가 끝난 뒤에도
                    <br className="desktop-br" /> 기업의 긍정적인 이미지를 일상 속에 남깁니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. High-End Quality Section (Sticky Scroll Design) */}
      <section className="section-quality" ref={qualitySectionRef}>
        <div className="popup-content-inner">
          <div className="quality-header-wrap mb-10 text-center animate-on-scroll">
            <span className="section-label">High-End Quality</span>
            <h2 className="section-tit">
              VUE만의 고성능 기술로
              <br />
              완성하는 기업 행사 퀄리티
            </h2>
          </div>

          <div className="quality-sticky-container">
            {/* Sticky Visual Area (Left/Top) */}
            <div className="quality-sticky-visual">
              <div className="quality-visual-frame">
                {qualityFeatures.map((feature, index) => (
                  <div
                    key={`visual-${feature.id}`}
                    className={`quality-visual-item ${activeQualityIndex === index ? "active" : ""
                      }`}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="quality-visual-overlay"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrolling Text Area (Right/Bottom) */}
            <div className="quality-scroll-content">
              {qualityFeatures.map((feature, index) => (
                <div
                  key={`text-${feature.id}`}
                  className={`quality-text-item ${activeQualityIndex === index ? "active" : ""
                    }`}
                  data-index={index}
                >
                  <div className="quality-text-inner">
                    <span className="quality-num">0{index + 1}</span>
                    <h3 className="quality-tit font-mj2">{feature.title}</h3>
                    <p className="quality-desc font-mj2">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. References & Reviews (Refactored Grid) */}
      <section className="section-references">
        <div className="popup-content-inner">
          <div className="text-center mb-20 animate-on-scroll">
            <span className="section-label">Our References</span>
            <h2 className="section-tit">
              수많은 기업이 선택한 이유,<br />실제 사례로 증명합니다.
            </h2>
          </div>

          <div className="reference-grid-wrapper">
            {referenceCategories.map((item) => (
              <div
                key={item.id}
                className="reference-card animate-on-scroll"
                onClick={() => setSelectedRef(item)}
              >
                <div className="ref-card-bg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="ref-overlay"></div>
                </div>
                <div className="ref-card-content">
                  <span className="ref-subtitle font-mj2">{item.subtitle}</span>
                  <h3 className="ref-title font-mj2">{item.title}</h3>
                </div>
                <div className="ref-hover-indicator">
                  <span>VIEW REFERENCE</span>
                  <Plus size={20} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Reference Detail Modal */}
      {selectedRef && (
        <div className="brand-modal-overlay" onClick={() => setSelectedRef(null)}>
          <div className="brand-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="brand-modal-close" onClick={() => setSelectedRef(null)}>
              <X size={24} />
            </button>
            <ScrollArea className="brand-modal-scroll-area">
              <div className="brand-modal-inner">
                {/* Header (Info) */}
                <div className="brand-modal-header !mb-12">
                  <span className="section-label">{selectedRef.subtitle}</span>
                  <h3 className="brand-modal-title">
                    {selectedRef.title}
                  </h3>
                  <p className="brand-modal-desc mt-6 text-slate-500 font-mj2 leading-relaxed break-keep max-w-2xl mx-auto">
                    {selectedRef.desc}
                    <br /><br />
                    VUE는 해당 분야의 깊은 이해를 바탕으로 최적의 포토부스 경험을 설계합니다.
                  </p>
                </div>

                {/* Gallery Grid */}
                <div className="brand-modal-gallery-grid w-full mt-10">
                  <div className="ref-gallery-grid">
                    <div className="ref-gallery-item tall rounded-3xl overflow-hidden shadow-sm">
                      <Image src="/images/popup/reference/ref_01.png" alt="gallery 01" fill className="object-cover" />
                    </div>
                    <div className="ref-gallery-item wide rounded-3xl overflow-hidden shadow-sm">
                      <Image src="/images/popup/reference/ref_02.png" alt="gallery 02" fill className="object-cover" />
                    </div>
                    <div className="ref-gallery-item tall rounded-3xl overflow-hidden shadow-sm">
                      <Image src="/images/popup/reference/ref_03.png" alt="gallery 03" fill className="object-cover" />
                    </div>
                    <div className="ref-gallery-item wide rounded-3xl overflow-hidden shadow-sm">
                      <Image src="/images/popup/reference/ref_04.png" alt="gallery 04" fill className="object-cover" />
                    </div>
                    <div className="ref-gallery-item wide rounded-3xl overflow-hidden shadow-sm">
                      <Image src="/images/popup/reference/ref_05.png" alt="gallery 05" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
      {/* 5. Systematic Process */}
      <section className="section-process px-6 md:px-8">
        <div className="popup-content-inner">
          <span className="section-label">Process</span>
          <h2 className="section-tit">
            전문가의 노하우로
            <br />
            무결점 행사 운영
          </h2>
          <div className="process-line">
            <div className="process-node animate-on-scroll">
              <div className="node-dot">
                <PenTool size={32} strokeWidth={1.2} />
              </div>
              <div className="node-content">
                <span className="node-step">STEP 01</span>
                <h4>맞춤형 컨설팅 및 디자인</h4>
                <p className="node-desc">
                  행사 성격에 맞춘 인화지 템플릿과 기기 UI를 전담 디자이너가 직접 제작합니다.
                </p>
                <div className="node-badge">
                  <ShieldCheck size={16} />
                  <span>사전 리스크 검증 완료</span>
                </div>
              </div>
            </div>
            <div
              className="process-node animate-on-scroll"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="node-dot">
                <UserCheck size={32} strokeWidth={1.2} />
              </div>
              <div className="node-content">
                <span className="node-step">STEP 02</span>
                <h4>전문 인력 현장 상주</h4>
                <p className="node-desc">
                  사전 도착 및 세팅은 물론, 행사 내내 내빈 안내와 기기 상태를 밀착 케어합니다.
                </p>
                <div className="node-badge">
                  <ShieldCheck size={16} />
                  <span>현장 매니저 1:1 케어</span>
                </div>
              </div>
            </div>
            <div
              className="process-node animate-on-scroll"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="node-dot">
                <FileBarChart size={32} strokeWidth={1.2} />
              </div>
              <div className="node-content">
                <span className="node-step">STEP 03</span>
                <h4>사후 데이터 및 리포트</h4>
                <p className="node-desc">
                  원본 파일 전달과 함께 마케팅 성과 측정을 위한 행사 참여 데이터를 정리해 드립니다.
                </p>
                <div className="node-badge">
                  <ShieldCheck size={16} />
                  <span>데이터 성과 리포트 제공</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Premium Concierge CTA Section */}
      <section className="section-cta-premium animate-on-scroll">
        <div className="cta-premium-bg"></div>
        <div className="popup-content-inner">
          <div className="cta-premium-header">
            <span className="section-label">Contact Us</span>
            <h2 className="cta-premium-tit">
              완벽한 행사를 위해,<br />
              VUE가 컨설팅해 드립니다.
            </h2>
            <p className="cta-premium-desc">언제든 문의해주세요</p>
          </div>

          <div className="cta-contact-grid">
            {/* option 1: Phone */}
            <a href="tel:010-7596-5558" className="contact-card">
              <div className="contact-icon">
                <PhoneCall size={32} strokeWidth={1.5} />
              </div>
              <div className="contact-info">
                <h3>유선 상담</h3>
                <p>010. 7596. 5558</p>
              </div>
              <ArrowRight className="card-arrow" />
            </a>

            {/* option 2: Kakao */}
            <a href="https://pf.kakao.com/_nSxcvG" target="_blank" rel="noopener noreferrer" className="contact-card highlight">
              <div className="contact-icon">
                <MessageCircle size={32} strokeWidth={1.5} />
              </div>
              <div className="contact-info">
                <h3>카카오톡 문의</h3>
                <p>실시간 채팅 상담</p>
              </div>
              <ArrowRight className="card-arrow" />
            </a>

            {/* option 3: Instagram */}
            <a href="https://www.instagram.com/official.vue" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon">
                <Instagram size={32} strokeWidth={1.5} />
              </div>
              <div className="contact-info">
                <h3>인스타그램 문의</h3>
                <p>@official.vue</p>
              </div>
              <ArrowRight className="card-arrow" />
            </a>
          </div>

          <p className="cta-premium-footer">상담 가능 시간: 24/7 상시 운영</p>
        </div>
      </section>
    </div>
  );
};

export default PopupServiceContent;
