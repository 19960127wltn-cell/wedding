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
  Instagram,
  ChevronRight
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
  { id: 'all', title: '전체' },
  { id: 'corp', title: '기업 행사' },
  { id: 'popup', title: '팝업 스토어' },
  { id: 'public', title: '공공기관/단체' },
  { id: 'school', title: '대학교/학교' },
];

const referenceData = [
  { id: 1, category: 'corp', entity: '애터미', title: '애터미 석세스 아카데미', image: '/popup/애터미1.JPG' },
  { id: 2, category: 'corp', entity: '애터미', title: 'Atomy Leaders Conference', image: '/popup/애터미2.JPG' },
  { id: 3, category: 'school', entity: '논산고등학교', title: '논산고 졸업 축제', image: '/popup/논산고0.JPG' },
  { id: 4, category: 'public', entity: '죽향초등학교', title: '죽향초 별빛 야영 행사', image: '/popup/죽향초0.JPG' },
  { id: 5, category: 'school', entity: '연세유치원', title: '연세유치원 가을 운동회', image: '/popup/연세유치원0.JPG' },
  { id: 6, category: 'corp', entity: '애터미', title: '애터미 패밀리 데이', image: '/popup/애터미3.JPG' },
  { id: 7, category: 'school', entity: '논산고등학교', title: '논산고 체육대회', image: '/popup/논산고1.JPG' },
  { id: 8, category: 'public', entity: '죽향초등학교', title: '죽향초 학예 발표회', image: '/popup/죽향초1.JPG' },
  { id: 9, category: 'school', entity: '연세유치원', title: '연세유치원 졸업 캠프', image: '/popup/연세유치원1.JPG' },
  { id: 10, category: 'corp', entity: '애터미', title: 'Atomy Global Workshop', image: '/popup/애터미4.JPG' },
  { id: 11, category: 'public', entity: '죽향초등학교', title: '죽향초 입학식 포토존', image: '/popup/죽향초2.JPG' },
  { id: 12, category: 'school', entity: '연세유치원', title: '연세유치원 입학 축하 파티', image: '/popup/연세유치원2.JPG' },
];

const PopupServiceContent = () => {
  const [selectedRef, setSelectedRef] = useState(null);
  const [isRefModalOpen, setIsRefModalOpen] = useState(false);
  const [activeRefCategory, setActiveRefCategory] = useState('all');
  const [activeRefEntity, setActiveRefEntity] = useState('all');
  const [activeQualityIndex, setActiveQualityIndex] = useState(0);
  const qualitySectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Entities for the active category
  const currentEntities = activeRefCategory === 'all'
    ? ['all', ...new Set(referenceData.map(item => item.entity))]
    : ['all', ...new Set(referenceData.filter(item => item.category === activeRefCategory).map(item => item.entity))];

  const filteredReferences = referenceData.filter(item => {
    const catMatch = activeRefCategory === 'all' || item.category === activeRefCategory;
    const entMatch = activeRefEntity === 'all' || item.entity === activeRefEntity;
    return catMatch && entMatch;
  });

  // Reset entity when category changes
  useEffect(() => {
    setActiveRefEntity('all');
  }, [activeRefCategory]);

  // Handle Horizontal Scroll with Mouse Wheel (Optional but Nice)
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

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

        </div>

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

      {/* 4. References (Horizontal Scroll Gallery) */}
      <section className="section-references relative overflow-hidden">
        <div className="popup-content-inner">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 px-6 animate-on-scroll">
            <div>
              <span className="section-label">Our References</span>
              <h2 className="section-tit !mb-0">
                수많은 기업이 선택한 이유,<br />실제 사례로 증명합니다.
              </h2>
            </div>
            <button
              className="mt-4 md:mt-0 flex items-center gap-1 text-primary group font-bold tracking-tight"
              onClick={() => setIsRefModalOpen(true)}
            >
              <span className="text-sm md:text-base">ALL VIEW</span>
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div
          className="ref-horizontal-scroll-container scrollbar-hide"
          ref={scrollContainerRef}
          onWheel={handleWheel}
        >
          <div className="ref-horizontal-track">
            {referenceData.slice(0, 10).map((item, idx) => (
              <div
                key={item.id}
                className="ref-scroll-item animate-on-scroll"
                style={{ transitionDelay: `${idx * 0.1}s` }}
                onClick={() => setSelectedRef(item)}
              >
                <div className="ref-scroll-img-box">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="ref-scroll-overlay">
                    <span className="ref-scroll-category font-mj2">{referenceCategories.find(c => c.id === item.category)?.title}</span>
                    <h4 className="ref-scroll-title font-mj2">{item.title}</h4>
                    <p className="ref-scroll-entity">{item.entity}</p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Centered View All Button */}
        <div className="hidden md:flex justify-center mt-12 pb-10 animate-on-scroll">
          <button
            className="flex flex-col items-center gap-3 text-primary hover:text-slate-900 transition-all group"
            onClick={() => setIsRefModalOpen(true)}
          >
            <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-sm">
              <Plus size={28} strokeWidth={1.5} />
            </div>
            <span className="text-base font-medium tracking-wide">전체보기</span>
          </button>
        </div>
      </section>

      {/* Full Support Reference Modal */}
      {isRefModalOpen && (
        <div className="brand-modal-overlay" onClick={() => setIsRefModalOpen(false)}>
          <div className="brand-modal-content max-w-[1200px] h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button className="brand-modal-close" onClick={() => setIsRefModalOpen(false)}>
              <X size={24} />
            </button>
            <ScrollArea className="brand-modal-scroll-area">
              <div className="brand-modal-inner !p-0">
                {/* Modal Header & Filters */}
                <div className="px-10 pt-12 text-center">
                  <span className="section-label !text-sm tracking-widest uppercase">Portfolio</span>
                  <h3 className="brand-modal-title !mt-2 !text-3xl">VUE 레퍼런스 보드</h3>
                </div>

                {/* Sticky Filters Area */}
                <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl px-10 py-8 border-b border-muted/30">

                  {/* Category Tabs */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {referenceCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveRefCategory(cat.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeRefCategory === cat.id
                          ? 'bg-primary text-white shadow-xl shadow-primary/20'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                          }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>

                  {/* Entity Filter Chips (Secondary) */}
                  <div className="flex flex-wrap justify-center gap-1.5 border-t border-muted/30 pt-6">
                    {currentEntities.map((ent) => (
                      <button
                        key={ent}
                        onClick={() => setActiveRefEntity(ent)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all border ${activeRefEntity === ent
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-transparent text-muted-foreground border-muted/50 hover:border-foreground/30'
                          }`}
                      >
                        {ent === 'all' ? '전체 기업/단체' : ent}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtered Grid Results */}
                <div className="p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReferences.map((item) => (
                      <div key={item.id} className="group relative bg-[#f1f5f9] rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500" onClick={() => setSelectedRef(item)}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                            {referenceCategories.find(c => c.id === item.category)?.title}
                          </span>
                          <h4 className="text-white text-lg font-mj2 mt-1">{item.title}</h4>
                          <p className="text-white/60 text-xs mt-0.5">{item.entity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredReferences.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground font-mj2">
                      해당 조건의 레퍼런스가 아직 없습니다.
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

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
                  <span className="section-label">
                    {referenceCategories.find(c => c.id === selectedRef.category)?.title}
                  </span>
                  <h3 className="brand-modal-title">
                    {selectedRef.title}
                  </h3>
                  <p className="brand-modal-desc mt-6 text-slate-500 font-mj2 leading-relaxed break-keep max-w-2xl mx-auto">
                    {selectedRef.entity}와 함께한 VUE의 프리미엄 포토부스 프로젝트입니다.
                    공간의 특성과 브랜드의 아이덴티티를 고려한 맞춤형 솔루션을 통해 차별화된 경험을 제공했습니다.
                  </p>
                </div>

                {/* Main Selected Image & Gallery */}
                <div className="brand-modal-gallery-grid w-full mt-10 pb-20">
                  <div className="flex flex-col items-center gap-10">
                    <div className="relative w-full max-w-4xl aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={selectedRef.image}
                        alt={selectedRef.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Additional Gallery Images */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-muted/20">
                        <Image src={selectedRef.image} alt="Gallery 1" fill className="object-cover opacity-90 transition-opacity hover:opacity-100" />
                      </div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-muted/20">
                        <Image src={selectedRef.image.replace(/(\d+)\./, (m, p1) => `${(parseInt(p1) % 4) + 1}.`)} alt="Gallery 2" fill className="object-cover opacity-90 transition-opacity hover:opacity-100" />
                      </div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-muted/20">
                        <Image src={selectedRef.image} alt="Gallery 3" fill className="object-cover opacity-90 transition-opacity hover:opacity-100 scale-x-[-1]" />
                      </div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-muted/20">
                        <Image src={selectedRef.image.replace(/(\d+)\./, (m, p1) => `${(parseInt(p1) % 4) + 2}.`)} alt="Gallery 4" fill className="object-cover opacity-90 transition-opacity hover:opacity-100" />
                      </div>
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
        </div>
      </section>
    </div>
  );
};

export default PopupServiceContent;
