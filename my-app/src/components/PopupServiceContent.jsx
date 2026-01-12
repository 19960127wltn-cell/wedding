"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  Layout,
  Users,
  Share2,
  Aperture,
  Printer,
  Smartphone,
  ShieldCheck,
  Award,
  HandHelping,
  PenTool,
  UserCheck,
  FileBarChart,
} from "lucide-react";
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

const PopupServiceContent = () => {
  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="popup-service-wrapper">


      {/* 1. Our Identity */}
      <section className="promise-section px-4 md:px-8 animate-on-scroll">
        <div className="popup-content-inner">
          <span
            className="section-label"
          >
            Our Identity
          </span>
          <h2 className="section-tit">
            VUE PHOTOBOOTH는
            <br />
            <em>타협하지 않는 전문성</em>으로 운영합니다.
          </h2>
          <div className="promise-grid">
            <div className="promise-item animate-on-scroll">
              <div className="promise-icon-box">
                <ShieldCheck size={40} strokeWidth={1.2} />
              </div>
              <h3>직접 운영의 원칙</h3>
              <div className="promise-divider"></div>
              <p>
                전문 교육을 받은 전담 매니저가 상주하여, 행사의 시작과 끝을 완벽히 책임집니다. 
              </p>
              <span className="promise-number">01</span>
            </div>
            <div
              className="promise-item animate-on-scroll"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="promise-icon-box">
                <Award size={40} strokeWidth={1.2} />
              </div>
              <h3>무결점 현장 매너</h3>
              <div className="promise-divider"></div>
              <p>
                단순 설치를 넘어, 기업 행사의 비즈니스 에티켓을 준수하여 정중하게 응대합니다.
              </p>
              <span className="promise-number">02</span>
            </div>
            <div
              className="promise-item animate-on-scroll"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="promise-icon-box">
                <HandHelping size={40} strokeWidth={1.2} />
              </div>
              <h3>철저한 리스크 관리</h3>
              <div className="promise-divider"></div>
              <p>
                보이지 않는 현장의 변수까지 세심하게 체크하여 안정적인 행사 진행을 약속합니다.
              </p>
              <span className="promise-number">03</span>
            </div>
          </div>

          {/* Brand Social Proof - Logo Rolling */}
          <div className="identity-logo-rolling animate-on-scroll">
            <p className="identity-logo-label">
              수많은 경험으로, <em>성공을 입증합니다.</em>
            </p>
            <div className="logo-trail">
              {Array.from({ length: 16 }).map((_, index) => (
                <div key={index} className="logo-item">
                  <span className="font-gnb text-2xl font-black italic tracking-tighter">
                    BRAND PARTNER
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. High-End Quality Section */}
      <section className="section-quality px-4 md:px-8">
        <div className="popup-content-inner">
          <div className="quality-header-wrap mb-20 text-center animate-on-scroll">
            <span className="section-label">High-End Quality</span>
            <h2 className="section-tit">
              VUE만의 고성능 기술로 완성하는 <em>기업 행사 퀄리티</em>
            </h2>
          </div>

          <div className="quality-row-container">
            <div className="quality-feature-row animate-on-scroll">
              <div className="feature-visual">
                <Image
                  src="/images/bright.png"
                  alt="Optics Tech"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
              <div className="feature-content">
                <div className="feature-icon-box">
                  <Aperture size={32} strokeWidth={1.2} />
                </div>
                <h4>스튜디오급 광학 시스템</h4>
                <p>
                  고성능 DSLR과 정교한 조명 세팅으로 어떤 장소에서도 무결점 결과물을 만듭니다.
                  화사함과 깊이감을 동시에 잡는 VUE만의 노하우입니다.
                </p>
              </div>
            </div>

            <div className="quality-feature-row animate-on-scroll">
              <div className="feature-visual">
                <Image
                  src="/images/hero-wedding.png"
                  alt="Printing Tech"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
              <div className="feature-content">
                <div className="feature-icon-box">
                  <Printer size={32} strokeWidth={1.2} />
                </div>
                <h4>10초 완성 프리미엄 인화</h4>
                <p>
                  대규모 인원도 대기 없이 즐길 수 있는
                  초고속 시스템과 선명한 프리미엄 인화지를 사용합니다.
                </p>
              </div>
            </div>

            <div className="quality-feature-row animate-on-scroll">
              <div className="feature-visual">
                <Image
                  src="/images/bright.png"
                  alt="Digital Tech"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
              <div className="feature-content">
                <div className="feature-icon-box">
                  <Smartphone size={32} strokeWidth={1.2} />
                </div>
                <h4>스마트 QR 디지털 솔루션</h4>
                <p>
                  QR코드를 통해 촬영본 파일(사진/GIF)을 즉시 스마트폰으로
                  전송합니다. 간편한 SNS 공유를 유도하여 기업의 마케팅 확산
                  효과를 극대화합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Service Appeal */}
      <section className="section-appeal px-4 md:px-8">
        <div className="popup-content-inner">
          <div className="appeal-header text-center mb-24 animate-on-scroll">
            <span className="section-label">Service Value</span>
            <h2 className="section-tit">
              단순한 설치를 넘어,
              <br />
              현장의 <em>분위기를 설계</em>합니다.
            </h2>
          </div>

          <div className="appeal-vertical-container">
            {/* Appeal 01 */}
            <div className="appeal-card-item animate-on-scroll">
              <div className="appeal-premium-card">
                <div className="appeal-visual-part">
                  <span className="appeal-num-tag">01</span>
                  <div className="appeal-img-box">
                    <Image
                      src="/images/bright.png"
                      alt="Minimal Design"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="appeal-text-part">
                  <div className="appeal-icon-wrap">
                    <Layout size={32} strokeWidth={1.2} />
                  </div>
                  <h3>
                    공간의 가치를 높이는
                    <br />
                    오브제 디자인
                  </h3>
                  <p>
                    어떤 행사장 인테리어와도 조화롭게 어우러지는
                    VUE만의 기기 디자인으로
                    공간의 첫인상을 전문적이고 세련되게 바꿉니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Appeal 02 */}
            <div className="appeal-card-item animate-on-scroll">
              <div className="appeal-premium-card">
                <div className="appeal-visual-part">
                  <span className="appeal-num-tag">02</span>
                  <div className="appeal-img-box">
                    <Image
                      src="/images/hero-wedding.png"
                      alt="Social Tool"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="appeal-text-part">
                  <div className="appeal-icon-wrap">
                    <Users size={32} strokeWidth={1.2} />
                  </div>
                  <h3>
                    보기만 하는 행사에서,
                    <br />
                    누구나 참여하고 싶은 경험으로
                  </h3>
                  <p>
                    정적인 행사 분위기를 활기차게 변화시키며, 참여자들이
                    자연스럽게 소통하고 즐길 수 있는 접점을 만듭니다. 현장의
                    에너지를 끌어올리는 가장 확실한 마케팅입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Appeal 03 */}
            <div className="appeal-card-item animate-on-scroll">
              <div className="appeal-premium-card">
                <div className="appeal-visual-part">
                  <span className="appeal-num-tag">03</span>
                  <div className="appeal-img-box">
                    <Image
                      src="/images/bright.png"
                      alt="Brand Experience"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="appeal-text-part">
                  <div className="appeal-icon-wrap">
                    <Share2 size={32} strokeWidth={1.2} />
                  </div>
                  <h3>
                    브랜드 가치의
                    <br />
                    지속적인 공유
                  </h3>
                  <p>
                  손에 든 사진 한 장이 행사가 끝난 뒤에도 기업의 긍정적인 이미지를 일상 속에 남깁니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. References & Reviews */}
      <section className="section-references px-4 md:px-8">
        <div className="popup-content-inner">
          <div className="portfolio-header text-center mb-16 animate-on-scroll">
            <span className="section-label">References</span>
            <h2 className="section-tit">
              수많은 기업이 선택한 이유,
              <br />
              실제 <em>사례로 증명</em>합니다.
            </h2>
          </div>

          <div className="portfolio-grid mb-24">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-box animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="portfolio-img-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="portfolio-img"
                  />
                  <div className="portfolio-tag-overlay font-gnb">
                    {item.category}
                  </div>
                </div>
                <div className="portfolio-info">
                  <h4 className="portfolio-tit-sub font-mj2">{item.title}</h4>
                  <p className="portfolio-desc-text font-mj2">{item.desc}</p>
                  <div className="review-quote-box">
                    <p className="quote-text font-mj2">&ldquo;{item.review}&rdquo;</p>
                    <span className="reviewer-name font-mj2">
                      - {item.reviewer}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Systematic Process */}
      <section className="section-process px-4 md:px-8">
        <div className="popup-content-inner">
          <span className="section-label">Process</span>
          <h2 className="section-tit">
            전문가의 노하우로
            <br />
            <em>무결점 행사</em> 운영
          </h2>
          <div className="process-line">
            <div className="process-node animate-on-scroll">
              <div className="node-dot">
                <PenTool size={24} strokeWidth={1.5} />
              </div>
              <div className="node-content">
                <span className="node-step">STEP 01</span>
                <h4>맞춤형 컨설팅 및 디자인</h4>
                <p>
                  행사 성격에 맞춘 인화지 템플릿과 기기 UI를 전담 디자이너가 직접
                  제작합니다.
                </p>
              </div>
            </div>
            <div
              className="process-node animate-on-scroll"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="node-dot">
                <UserCheck size={24} strokeWidth={1.5} />
              </div>
              <div className="node-content">
                <span className="node-step">STEP 02</span>
                <h4>전문 인력 현장 상주</h4>
                <p>
                  사전 도착 및 세팅은 물론, 행사 내내 내빈 안내와 기기 상태를 밀착
                  케어합니다.
                </p>
              </div>
            </div>
            <div
              className="process-node animate-on-scroll"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="node-dot">
                <FileBarChart size={24} strokeWidth={1.5} />
              </div>
              <div className="node-content">
                <span className="node-step">STEP 03</span>
                <h4>사후 데이터 및 리포트</h4>
                <p>
                  원본 파일 전달과 함께 마케팅 성과 측정을 위한 행사 참여 데이터를
                  정리해 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="section-cta px-4 md:px-8">
        <div className="popup-content-inner">
          <div className="popup-cta animate-on-scroll">
            <div className="cta-glow"></div>
            <span className="cta-badge">
              시즌 예약 문의 급증 - 잔여 일정 확인 필수
            </span>
            <h2 className="cta-tit">
              귀사의 소중한 행사,
              <br />
              실패 없는 파트너와 시작하세요.
            </h2>
            <p className="cta-desc">
              지금 문의 주시면 행사 맞춤형 큐레이션 안을 24시간 내 전달
              드립니다.
            </p>
            <button
              className="cta-btn font-mj2"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              간편 견적 문의하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopupServiceContent;
