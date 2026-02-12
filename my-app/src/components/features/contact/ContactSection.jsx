
import React from 'react';
import { Info } from 'lucide-react';
import './ContactSection.css';

const branches = [
    { name: '서울 본점', desc: '서울 · 경기 · 인천 수도권', phone: '02-123-4567', kakao: '#' },
    { name: '대전 지점', desc: '충청 · 중부권 지역', phone: '042-123-4567', kakao: '#' },
    { name: '광주 지점', desc: '전라 · 호남권 지역', phone: '062-123-4567', kakao: '#' },
    { name: '부산 지점', desc: '경상 · 영남권 지역', phone: '051-123-4567', kakao: '#' }
];

const pinSvg = <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>;

const ContactSection = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedBranch, setSelectedBranch] = React.useState(null);

    const openContactModal = (branch) => {
        setSelectedBranch(branch);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeContactModal = () => {
        setModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <section className="branch-section">
            <h2 className="section-title">전국 <span className="font-mj2 text-primary-color">4</span><span className="text-primary-color">개 지점</span>에서<br />동일한 프리미엄 서비스를<br />만나보세요</h2>

            <div className="branch-grid">
                {branches.map((b, index) => (
                    <div className="branch-card" key={index}>
                        <div className="pin-icon">{pinSvg}</div>
                        <span className="branch-name">{b.name}</span>
                        <p className="branch-desc">{b.desc}</p>
                        <button className="open-modal-btn" onClick={() => openContactModal(b)}>문의하기</button>
                    </div>
                ))}
            </div>

            <p className="info-footer">
                <Info size={16} className="info-icon" />
                기재되지 않은 지역의 예식은 <strong>서울 본점</strong>을 통해 문의해주세요.
            </p>

            {modalOpen && selectedBranch && (
                <div className="modal-overlay" onClick={closeContactModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeContactModal}>×</button>
                        <h3 className="selected-branch-title">{selectedBranch.name} 상담 문의</h3>
                        <div className="modal-contact-group">
                            <a href={selectedBranch.kakao} className="contact-link link-kakao" target="_blank" rel="noopener noreferrer">📱 카카오톡 실시간 상담</a>
                            <a href={`tel:${selectedBranch.phone}`} className="contact-link link-phone">📞 전화로 문의하기</a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactSection;
