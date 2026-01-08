'use client';
import React from 'react';
import Image from 'next/image';
import './PopupPortfolio.css';

const portfolioItems = [
    {
        id: 1,
        category: 'IT GLOBAL CONFERENCE',
        title: '글로벌 테크 기업 컨퍼런스',
        desc: '전담 매니저 2인 배치, 기업 로고 커스텀 프레임 4종 운영',
        review: '장비의 고급스러움은 물론이고, 매니저님들의 의전 매너가 훌륭해서 VIP 분들이 매우 만족하셨습니다.',
        reviewer: '행사 기획 담당 이OO 대리',
        image: '/images/bright.png'
    },
    {
        id: 2,
        category: 'GOVERNMENT EVENT',
        title: '공공기관 비전 선포식',
        desc: '대규모 인원 수용을 위한 초고속 출력 모드 적용',
        review: '줄이 길었는데도 빠른 회전율 덕분에 민원 없이 성공적으로 마무리되었습니다. 데이터 관리도 철저해서 안심이 됐습니다.',
        reviewer: '운영팀 총괄 박OO 과장',
        image: '/images/hero-wedding.png'
    },
    {
        id: 3,
        category: 'LUXURY BRAND POP-UP',
        title: '글로벌 패션 브랜드 팝업스토어',
        desc: '브랜드 컨셉을 반영한 맞춤형 외부 래핑 및 전용 필터 개발',
        review: '현장 분위기와 너무 잘 어울리는 기기 디자인 덕분에 인스타그램 바이럴 효과를 톡톡히 봤습니다.',
        reviewer: '마케팅팀 김OO 팀장',
        image: '/images/bright.png'
    },
    {
        id: 4,
        category: 'CORPORATE YEAR-END PARTY',
        title: '대기업 연말 사은 행사',
        desc: '직원 가족 대상 멀티 부스 운영 및 고화질 원본 실시간 전송',
        review: '어린 아이들부터 어르신들까지 조작이 간편해 모두가 즐거워했습니다. 내년 행사에도 꼭 다시 부르고 싶네요.',
        reviewer: '인사담당 최OO 대리',
        image: '/images/hero-wedding.png'
    }
];

const PopupPortfolioContent = () => {
    return (
        <section className="portfolio-section px-4 md:px-8">
            <div className="popup-content-inner">
                <div className="portfolio-header text-center mb-16">
                    <span className="section-label">References</span>
                    <h2 className="section-tit">수많은 기업이 선택한 이유,<br />실제 사례와 <em>리뷰로 증명</em>합니다.</h2>
                </div>

                <div className="portfolio-grid">
                    {portfolioItems.map((item) => (
                        <div key={item.id} className="portfolio-box">
                            <div className="portfolio-img-wrap">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="portfolio-img"
                                />
                                <div className="portfolio-tag-overlay font-gnb">{item.category}</div>
                            </div>
                            <div className="portfolio-info">
                                <h4 className="portfolio-tit-sub font-mj2">{item.title}</h4>
                                <p className="portfolio-desc-text font-mj2">{item.desc}</p>
                                <div className="review-quote-box">
                                    <p className="quote-text font-mj2">"{item.review}"</p>
                                    <span className="reviewer-name font-mj2">- {item.reviewer}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopupPortfolioContent;
