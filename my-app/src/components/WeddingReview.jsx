'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronDown, User } from 'lucide-react';
import './WeddingReview.css';


const reviews = [
    {
        id: 1,
        sender: '최*윤 신부님',
        content: '정신이 없어서 이제야 연락드리네요. 뷰포토부스 덕분에 결혼식이 훨씬 풍성해졌어요. 직원분들도 너무 친절하셔서 하객분들 모두 기분 좋게 촬영하셨고, 특히 방명록 디테일에 또 한 번 감동했습니다. 제 소중한 날을 더 특별하게 만들어주셔서 정말 감사합니다.'
    },
    {
        id: 2,
        sender: '김*나 신부님',
        content: '포토방명록 정성스럽게 보내주셔서 정말 감사합니다. 액자 퀄리티도 대박이고, 특히 부모님이 남겨주신 메시지 보고 눈물 났어요. 지인들도 다들 너무 센스 있는 이벤트라고 칭찬해주셔서 본식 때 제일 잘한 선택인 것 같아요. 뷰포토부스 진짜 강추입니다.'
    },
    {
        id: 3,
        sender: '박*영 신부님',
        content: '신행 다녀오자마자 방명록 확인했는데 한 장 한 장 너무 재미있고 소중하네요. 사실 부모님이랑 신랑이 포토부스를 좀 낯설어할까 봐 걱정했는데, 저보다 더 좋아하셔서 깜짝 놀랐어요. 예쁜 사진 많이 남겨주셔서 감사해요. 주변에도 엄청 홍보 중이에요.'
    },
    {
        id: 4,
        sender: '이*정 신부님',
        content: '하객분들이 너무 즐거워하셔서 정말 뿌듯했어요. 사실 제가 포토부스에 진심이라 호텔 기본 옵션도 안 하고 여기저기 꼼꼼하게 비교해보고 선택한 건데, 역시 보람이 있네요. 꼼꼼한 설치랑 화질까지 정말 완벽했습니다. 입소문 많이 낼게요.'
    },
    {
        id: 5,
        sender: '정*수 신부님',
        content: '지인이 추천해줘서 진행했는데 확실히 화질도 너무 좋고 인화지도 고급스러워서 만족스럽네요. 특히 템플릿 디자인이 세련되어서 다들 좋아하셨습니다. 덕분에 예식 분위기가 한결 화기애애해졌습니다.'
    },
    {
        id: 6,
        sender: '한*지 신부님',
        content: '친구가 하는 거 보고 저도 결혼할 때 여기서 하려고 저장해뒀어요. 줄 서서 찍을 정도로 인기 많더라구요. 템플릿 디자인도 너무 예쁘고 무엇보다 조명이 좋아서 사진이 너무 잘 나와요.'
    },
    {
        id: 7,
        sender: '임*진 신부님',
        content: '다녀간 하객분들이 포토부스 칭찬을 너무 많이 하셔서 정말 뿌듯했습니다. 방명록이랑 액자도 정성스럽게 챙겨주셔서 감사합니다. 하길 정말 잘했다는 생각이 드네요.'
    },
    {
        id: 8,
        sender: '윤*아 신부님',
        content: '부모님과 신랑이 처음에는 생소해하더니 나중에는 저보다 더 만족하고 좋아하셨어요. 예쁜 사진 남겨주셔서 감사하고 주변에도 많이 소개하겠습니다. 번창하세요.'
    },
    {
        id: 9,
        sender: '조*희 신부님',
        content: '스탭분들이 두 분이나 오셔서 차근차근 잘 안내해주시고 하객분들께 엽서 쓰기도 권해주셔서 방명록이 정말 풍성해졌어요. 사진 퀄리티가 너무 좋아서 나중에 아들 결혼할 때도 추천해주고 싶네요.'
    },
    {
        id: 10,
        sender: '오*택 신부님',
        content: '당일에 하객분들한테 칭찬 많이 들었습니다. 신혼여행 바로 가느라 아직 방명록 확인은 못 했지만 너무 좋은 추억 남긴 것 같아서 행복합니다. 더 널리 알릴게요.'
    },
    {
        id: 11,
        sender: '강*우 신부님',
        content: '사진도 너무 예쁘고 지인들의 따뜻한 편지까지 볼 수 있어서 정말 행복했습니다. 뷰포토부스 동네방네 자랑하고 다닐 거예요. 감사합니다.'
    },
    {
        id: 12,
        sender: '송*경 신부님',
        content: '설치부터 운영까지 정말 깔끔했습니다. 특히 하객분들이 지루하지 않게 대기 시간 동안 즐겁게 참여해주시는 모습이 인상적이었어요. 덕분에 본식 분위기가 살았습니다.'
    },
    {
        id: 13,
        sender: '유*민 신부님',
        content: '화질이 정말 남다르네요. 다른 포토부스들도 많이 가봤는데 조명이랑 필터가 독보적입니다. 하객분들이 인생샷 건졌다고 다들 좋아하셨어요.'
    },
    {
        id: 14,
        sender: '황*웅 신부님',
        content: '방명록 구성이 너무 알차서 놀랐습니다. 한 장 한 장 정성이 느껴지네요. 저희 부부에게 평생 잊지 못할 선물이 된 것 같습니다.'
    },
    {
        id: 15,
        sender: '설*효 신부님',
        content: '직원분들이 하객 한 분 한 분 웃으면서 응대해주시는 모습에 감동했습니다. 대접받는 느낌이 든다고 다들 그러시더라구요. 감사합니다.'
    },
    {
        id: 16,
        sender: '권*진 신부님',
        content: '호텔 기본 서비스 안 하고 뷰포토부스 선택한 건 이번 예식 통틀어 가장 잘한 결정이었습니다. 퀄리티 차이가 확실히 느껴지네요.'
    },
    {
        id: 17,
        sender: '백*현 신부님',
        content: '템플릿 디자인이 세련되어서 저희 예식 컨셉이랑 너무 잘 어울렸습니다. 작은 부분까지 신경 써주시는 게 느껴졌어요.'
    },
    {
        id: 18,
        sender: '문*은 신부님',
        content: '신부 대기실에 있느라 밖의 분위기를 잘 몰랐는데, 나중에 방명록 보고 하객분들이 이렇게나 즐거워하셨구나 싶어서 마음이 놓였습니다.'
    },
    {
        id: 19,
        sender: '고*준 신부님',
        content: '사진 인화 속도도 빠르고 기기 인터페이스도 쉬워서 어르신들도 즐겁게 참여하시는 모습이 보기 좋았습니다. 모든 세대가 만족하는 서비스네요.'
    },
    {
        id: 20,
        sender: '배*윤 신부님',
        content: '방명록 액자가 너무 예쁘게 나와서 거실 명당에 장식해뒀습니다. 볼 때마다 예식 날의 설렘이 떠오르네요.'
    },
    {
        id: 21,
        sender: '심*연 신부님',
        content: '다른 예식장 친구들에게도 무조건 여기서 하라고 추천하고 있습니다. 사실 저만 알고 싶은 업체지만 좋은 건 나눠야 하니까요.'
    },
    {
        id: 22,
        sender: '안*혁 신부님',
        content: '현장 스탭분들의 프로페셔널한 운영 덕분에 혼잡함 없이 원활하게 진행되었습니다. 전문업체는 역시 다르다는 걸 느꼈습니다.'
    },
    {
        id: 23,
        sender: '서*영 신부님',
        content: '사진 찍는 걸 쑥스러워하시던 시부모님도 스탭분들의 친근한 안내 덕분에 예쁘게 촬영하셨어요. 그 사진이 제 보물 1호가 되었습니다.'
    },
    {
        id: 24,
        sender: '장*은 신부님',
        content: '예식 전 소통부터 당일 운영, 그리고 후속 조치까지 모든 과정이 완벽했습니다. 뷰포토부스 덕분에 제 결혼식이 완성된 기분입니다.'
    },
];

const ReviewItem = ({ review, index, isExpanded, isMobile }) => {
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef(null);

    useEffect(() => {
        if (!isMobile) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => observer.disconnect();
    }, [isMobile]);

    const animationDelay = isMobile
        ? (isVisible
            ? (index < 5
                ? `${index * 0.25}s`
                : (isExpanded ? `${(index - 5) * 0.1}s` : '0.1s')
            )
            : '0s')
        : (isExpanded && index >= 5 ? '0s' : `${index * 0.1}s`);

    return (
        <div
            ref={itemRef}
            className={`chat-scroll-item ${isVisible ? 'fade-in-up' : ''} ${isExpanded && index >= 5 ? 'expanded-item' : ''}`}
            style={{ animationDelay: animationDelay }}
        >
            <div className="chat-avatar">
                <User size={20} className="text-slate-400" />
            </div>
            <div className="chat-message-content">
                <div className="chat-sender-info">
                    <span className="chat-sender-name font-mj2">{review.sender}</span>
                </div>
                <div className="chat-bubble font-mj2">
                    {review.content}
                </div>
            </div>
        </div>
    );
};

const WeddingReview = () => {
    const [headerVisible, setHeaderVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 500);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

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

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const displayedReviews = (isMobile && !isExpanded) ? reviews.slice(0, 5) : reviews;

    return (
        <section className="wedding-review-section">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <h2
                    ref={headerRef}
                    className={`benefits-title text-3xl md:text-4xl font-bold text-left leading-relaxed ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="text-primary block text-[32px] font-normal mb-2" style={{ fontFamily: 'Weddingday' }}>
                        Review
                    </span>
                    <span className="text-3xl md:text-4xl font-mj2 font-black block">
                        고객님들의 생생한 후기를 확인해보세요
                    </span>
                    <div className="benefits-divider"></div>
                </h2>
            </div>

            <div className={`chat-scroll-container ${isMobile ? 'mobile-list-view' : ''} ${isExpanded ? 'is-expanded' : ''}`}>
                <div className="chat-scroll-track">
                    {displayedReviews.map((review, index) => (
                        <ReviewItem
                            key={review.id}
                            review={review}
                            index={index}
                            isExpanded={isExpanded}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

                {isMobile && (
                    <div className="review-more-action">
                        <button
                            className={`review-more-btn font-mj2 ${isExpanded ? 'is-expanded' : ''}`}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? '접기' : '더보기'}
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WeddingReview;
